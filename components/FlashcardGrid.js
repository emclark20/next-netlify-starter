import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import styles from './FlashcardGrid.module.css';

const FlashcardGrid = ({ category = null, bookmarksOnly = false }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Fetch the flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        
        // Determine which API endpoint to call
        let url = bookmarksOnly 
          ? '/api/bookmarks' 
          : `/api/flashcards${category ? `?category=${encodeURIComponent(category)}` : ''}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch flashcards');
        }
        
        const data = await response.json();
        
        // Set the flashcards based on which endpoint was called
        const cardsData = bookmarksOnly ? data.bookmarks : data.flashcards;
        setFlashcards(cardsData);
        
        // If not in bookmarks-only mode, fetch the user's bookmarks to mark them
        if (!bookmarksOnly) {
          try {
            const bookmarksResponse = await fetch('/api/bookmarks');
            if (bookmarksResponse.ok) {
              const bookmarksData = await bookmarksResponse.json();
              const bookmarkSet = new Set(
                bookmarksData.bookmarks.map(bookmark => bookmark.flashcard_id)
              );
              setBookmarkedIds(bookmarkSet);
            }
          } catch (err) {
            console.error('Error fetching bookmarks:', err);
            // Non-critical error, so we don't set the main error state
          }
        }
      } catch (err) {
        console.error('Error fetching flashcards:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [category, bookmarksOnly]);

  // Handle bookmark toggling
  const handleToggleBookmark = async (flashcardId, isBookmarking) => {
    try {
      if (isBookmarking) {
        // Add bookmark
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ flashcardId }),
        });

        if (response.ok) {
          setBookmarkedIds(prev => new Set([...prev, flashcardId]));
        }
      } else {
        // Remove bookmark
        const response = await fetch(`/api/bookmarks?flashcardId=${flashcardId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBookmarkedIds(prev => {
            const newSet = new Set([...prev]);
            newSet.delete(flashcardId);
            return newSet;
          });
          
          // If in bookmarks-only mode, remove the card from the list
          if (bookmarksOnly) {
            setFlashcards(prev => prev.filter(card => card.flashcard_id !== flashcardId));
          }
        }
      }
    } catch (err) {
      console.error('Error updating bookmark:', err);
      // Optionally show an error to the user
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading flashcards...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (flashcards.length === 0) {
    return (
      <div className={styles.empty}>
        {bookmarksOnly 
          ? "You haven't bookmarked any flashcards yet." 
          : "No flashcards available."}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {flashcards.map(card => (
        <Flashcard
          key={card.flashcard_id}
          id={card.flashcard_id}
          title={card.category}
          letter={card.content}
          href={`/flashcard/${card.flashcard_id}`}
          isBookmarked={bookmarksOnly || bookmarkedIds.has(card.flashcard_id)}
          onToggleBookmark={handleToggleBookmark}
        />
      ))}
    </div>
  );
};

export default FlashcardGrid;