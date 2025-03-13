import React, { useState, useEffect, useRef } from 'react';
import styles from './BigFlashcard.module.css';

const BigFlashcard = ({ id, category, content, videoContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const videoRef = useRef(null);

  // Check if user is authenticated and if card is bookmarked
  useEffect(() => {
    const checkAuthAndBookmarkStatus = async () => {
      try {
        // Check authentication
        const authResponse = await fetch('/api/user/profile');
        const isAuth = authResponse.ok;
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          // Check if this flashcard is bookmarked
          const bookmarksResponse = await fetch('/api/bookmarks');
          if (bookmarksResponse.ok) {
            const bookmarksData = await bookmarksResponse.json();
            const isMarked = bookmarksData.bookmarks.some(
              bookmark => bookmark.flashcard_id === id
            );
            setIsBookmarked(isMarked);
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    if (id) {
      checkAuthAndBookmarkStatus();
    }
  }, [id]);

  // Effect to handle video playback when card is flipped
  useEffect(() => {
    if (isFlipped && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error auto-playing video:', err);
      });
    }
  }, [isFlipped]);

  // Toggle flashcard flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Toggle bookmark
  const toggleBookmark = async (e) => {
    e.stopPropagation(); // Prevent card flip when clicking bookmark
    
    if (!isAuthenticated) {
      setShowLoginAlert(true);
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

  // Close login alert
  const closeLoginAlert = (e) => {
    e.stopPropagation();
    setShowLoginAlert(false);
  };

  return (
    <div 
      className={`${styles.bigFlashcardContainer} ${isFlipped ? styles.flipped : ''}`} 
      onClick={handleFlip}
    >
      <div className={styles.flipper}>
        {/* Front of card (text) */}
        <div className={styles.front}>
          <div className={styles.header}>
            <h2 className={styles.title}>{category}</h2>
          </div>
          <div className={styles.content}>
            <span className={styles.text}>
              {content}
            </span>
          </div>
          
          {/* Bookmark button */}
          <button 
            className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`}
            onClick={toggleBookmark}
            disabled={isLoading}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
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
          
          {/* Flip instruction */}
          <div className={styles.flipInstruction}>
            <span>Click to see sign</span>
          </div>
        </div>
        
        {/* Back of card (video) */}
        <div className={styles.back}>
          <div className={styles.header}>
            <h2 className={styles.title}>{category}</h2>
          </div>
          <div className={styles.videoContainer}>
            {videoContent ? (
              <div className={styles.videoWrapper}>
                <video 
                  ref={videoRef}
                  className={styles.video} 
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={videoContent} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className={styles.noVideo}>
                <p>No video available for this sign.</p>
              </div>
            )}
          </div>
          
          {/* Flip instruction */}
          <div className={styles.flipInstruction}>
            <span>Click to flip back</span>
          </div>
        </div>
      </div>
      
      {/* Login Alert Modal */}
      {showLoginAlert && (
        <div className={styles.loginAlertOverlay} onClick={closeLoginAlert}>
          <div className={styles.loginAlert} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeLoginAlert}>×</button>
            <h3>Sign in Required</h3>
            <p>You need to sign in or create an account to bookmark flashcards.</p>
            <div className={styles.alertButtons}>
              <a href="/signUp" className={styles.signUpButton}>
                Sign Up / Sign In
              </a>
              <button className={styles.cancelButton} onClick={closeLoginAlert}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigFlashcard;