import React, { useState, useEffect, useRef } from 'react';
import FlashcardCard from './FlashcardCard';

const FlashcardSection = ({ title, category }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Fetch flashcards and bookmark status
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch flashcards for this category
        const flashcardsResponse = await fetch(`/api/flashcards?category=${encodeURIComponent(category)}`);
        
        if (!flashcardsResponse.ok) {
          throw new Error(`Failed to fetch ${category} flashcards`);
        }
        
        const flashcardsData = await flashcardsResponse.json();
        setFlashcards(flashcardsData.flashcards);
        
        // Check which flashcards are bookmarked
        try {
          const bookmarksResponse = await fetch('/api/bookmarks');
          
          if (bookmarksResponse.ok) {
            const bookmarksData = await bookmarksResponse.json();
            const bookmarkSet = new Set(
              bookmarksData.bookmarks.map(bookmark => bookmark.flashcard_id)
            );
            setBookmarkedIds(bookmarkSet);
          }
        } catch (bookmarkError) {
          // Non-critical error, just means bookmarks won't be highlighted
          console.error('Error fetching bookmarks:', bookmarkError);
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [category]);

  // Handle navigation (previous cards)
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  // Handle navigation (next cards)
  const handleNext = () => {
    if (currentIndex + 3 < flashcards.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  // Get the current visible flashcards (3 at a time)
  const getVisibleFlashcards = () => {
    return flashcards.slice(currentIndex, currentIndex + 3);
  };

  if (loading) {
    return (
      <div className="section-container">
        <h2>{title}</h2>
        <div className="loading-message">Loading {category} flashcards...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-container">
        <h2>{title}</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="section-container">
        <h2>{title}</h2>
        <div className="empty-message">No {category} flashcards available.</div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <h2>{title}</h2>
      
      <div className="card-scroller">
        <button 
          className="scroll-button left" 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        
        <div className="scroll-container" ref={scrollContainerRef}>
          {getVisibleFlashcards().map(card => (
            <FlashcardCard
              key={card.flashcard_id}
              id={card.flashcard_id}
              category={card.category}
              content={card.content}
              initialIsBookmarked={bookmarkedIds.has(card.flashcard_id)}
            />
          ))}
        </div>
        
        <button 
          className="scroll-button right" 
          onClick={handleNext}
          disabled={currentIndex + 3 >= flashcards.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FlashcardSection;