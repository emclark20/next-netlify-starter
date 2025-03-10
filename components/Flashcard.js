import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './Flashcard.module.css';

const Flashcard = ({ 
  id, 
  title, 
  letter, 
  href,
  isBookmarked = false,
  onToggleBookmark 
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  // Update local state when prop changes
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmarkClick = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking bookmark
    setBookmarked(!bookmarked);
    
    if (onToggleBookmark) {
      onToggleBookmark(id, !bookmarked);
    }
  };

  return (
    <div className={styles.flashcardContainer}>
      <Link href={href} className={styles.link}>
        <div className={styles.flashcard}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.content}>
            <span className={`${styles.letter} ${styles.fixedSize}`}>
              {letter}
            </span>
          </div>
        </div>
      </Link>
      <button 
        className={`${styles.bookmarkButton} ${bookmarked ? styles.bookmarked : ''}`}
        onClick={handleBookmarkClick}
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill={bookmarked ? "currentColor" : "none"}
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Flashcard;