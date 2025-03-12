import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import styles from './FlashcardGrid.module.css';

const FlashcardGrid = ({ category, bookmarksOnly = false }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  // Add debugging state for production issues
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('FlashcardGrid fetching data for category:', category, 'bookmarksOnly:', bookmarksOnly);
        
        // Different API calls based on the selected category or bookmarksOnly flag
        let response;
        
        if (bookmarksOnly || category === 'Bookmarked') {
          // If "Bookmarked" is selected or bookmarksOnly is true, fetch from bookmarks API
          console.log('Fetching bookmarks from API');
          response = await fetch('/api/bookmarks');
          
          // Log response status for debugging
          console.log('Bookmarks API response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Received bookmark data:', data);
            setFlashcards(data.bookmarks); // Use the bookmarks data directly
            
            // Create a set of bookmarked IDs (all cards are bookmarked in this view)
            const bookmarkSet = new Set(
              data.bookmarks.map(bookmark => bookmark.flashcard_id)
            );
            setBookmarkedIds(bookmarkSet);
          } else {
            // Save error response for debugging
            const errorText = await response.text();
            setDebugInfo({
              endpoint: '/api/bookmarks',
              status: response.status,
              response: errorText
            });
            throw new Error(`Failed to fetch bookmarks: ${response.status}`);
          }
        } else {
          // For other categories, use the regular flashcards API
          const queryParam = category ? `?category=${encodeURIComponent(category)}` : '';
          const apiUrl = `/api/flashcards${queryParam}`;
          console.log('Fetching flashcards from API:', apiUrl);
          
          response = await fetch(apiUrl);
          
          // Log response status for debugging
          console.log('Flashcards API response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log(`Received ${data.flashcards?.length || 0} flashcards:`, 
              data.flashcards?.map(f => `${f.category}: ${f.content}`).slice(0, 5));
            setFlashcards(data.flashcards);
            
            // Also fetch bookmarks to indicate which cards are bookmarked
            try {
              const bookmarksResponse = await fetch('/api/bookmarks');
              if (bookmarksResponse.ok) {
                const bookmarksData = await bookmarksResponse.json();
                const bookmarkSet = new Set(
                  bookmarksData.bookmarks.map(bookmark => bookmark.flashcard_id)
                );
                setBookmarkedIds(bookmarkSet);
              } else {
                console.log('Bookmarks response not OK:', bookmarksResponse.status);
              }
            } catch (err) {
              console.error('Error fetching bookmarks:', err);
            }
          } else {
            // Save error response for debugging
            const errorText = await response.text();
            setDebugInfo({
              endpoint: apiUrl,
              status: response.status,
              response: errorText
            });
            throw new Error(`Failed to fetch flashcards for category: ${category}, status: ${response.status}`);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [category, bookmarksOnly]); // Re-fetch when category or bookmarksOnly changes

  // Update bookmark status in UI after toggling
  const handleToggleBookmark = (id, isBookmarked) => {
    if (isBookmarked) {
      setBookmarkedIds(prev => new Set([...prev, id]));
    } else {
      setBookmarkedIds(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(id);
        return newSet;
      });
      
      // If we're in Bookmarked view or bookmarksOnly is true, remove the card from the view
      if (bookmarksOnly || category === 'Bookmarked') {
        setFlashcards(prev => prev.filter(card => card.flashcard_id !== id));
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading flashcards...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}
        {debugInfo && (
          <details>
            <summary>Debug Information (Click to expand)</summary>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </details>
        )}
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className={styles.empty}>
        {(bookmarksOnly || category === 'Bookmarked')
          ? "You haven't bookmarked any flashcards yet." 
          : category 
            ? `No flashcards available for ${category}.` 
            : "No flashcards available."}
        {debugInfo && (
          <details>
            <summary>Debug Information (Click to expand)</summary>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </details>
        )}
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
          isBookmarked={bookmarkedIds.has(card.flashcard_id)}
          onToggleBookmark={handleToggleBookmark}
        />
      ))}
    </div>
  );
};

export default FlashcardGrid;