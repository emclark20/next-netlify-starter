import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Component for individual flashcards with bookmark functionality
const FlashcardCard = ({ 
  id, 
  category, 
  content, 
  initialIsBookmarked = false,
  showBookmark = true 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/user/profile');
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    
    checkAuth();
  }, []);

  // Toggle bookmark function
  const toggleBookmark = async (e) => {
    e.preventDefault(); // Prevent navigation
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/auth';
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await fetch(`/api/bookmarks?flashcardId=${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setIsBookmarked(false);
        } else {
          console.error('Failed to remove bookmark');
        }
      } else {
        // Add bookmark
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ flashcardId: id }),
        });
        
        if (response.ok) {
          setIsBookmarked(true);
        } else {
          console.error('Failed to add bookmark');
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Return the header text based on category
  const getHeaderText = () => {
    if (category === 'Alphabet') {
      return 'Alphabet';
    } else if (category === 'Common Phrases') {
      return 'Phrase';
    }
    return category;
  };

  return (
    <div className="flashcard">
      <div className="flashcard-header">
        {getHeaderText()}
      </div>
      <div className="flashcard-content">
        <span className="flashcard-text">
          {content}
        </span>
      </div>
      {showBookmark && (
        <button 
          className="bookmark-icon" 
          onClick={toggleBookmark}
          disabled={isLoading}
          aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default FlashcardCard;