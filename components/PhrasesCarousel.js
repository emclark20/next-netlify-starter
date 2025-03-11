import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard'; // Import your existing Flashcard component
import Link from 'next/link';
import styles from './AlphabetCarousel.module.css'; // Assuming you're using the same styles

/**
 * PhrasesCarousel Component
 * 
 * A carousel that displays common phrase flashcards three at a time with bookmark functionality.
 * 
 * @returns {React.Component} The PhrasesCarousel component
 */
const PhrasesCarousel = () => {
  // State to store flashcard data from the database
  const [flashcards, setFlashcards] = useState([]);
  
  // State to track bookmarked flashcards
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  
  // State to track which index to start showing phrases from
  const [startIndex, setStartIndex] = useState(0);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // Fetch flashcards and bookmarks from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch common phrases flashcards
        const flashcardsResponse = await fetch('/api/flashcards?category=Common+Phrases');
        
        if (flashcardsResponse.ok) {
          const flashcardsData = await flashcardsResponse.json();
          setFlashcards(flashcardsData.flashcards);
          
          // Try to fetch bookmarks
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
          }
        } else {
          console.error('Failed to fetch flashcards');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate the maximum starting index
  const maxIndex = Math.max(0, flashcards.length - 3); // We show 3 cards at a time
  
  /**
   * Handler for the "next" button
   * Advances the carousel by one phrase or loops back to the beginning
   */
  const handleNext = () => {
    if (startIndex < maxIndex) {
      // If not at the end, move forward one position
      setStartIndex(startIndex + 1);
    } else {
      // If at the end, loop back to the beginning
      setStartIndex(0);
    }
  };
  
  /**
   * Handler for the "previous" button
   * Moves the carousel back by one phrase or loops to the end
   */
  const handlePrev = () => {
    if (startIndex > 0) {
      // If not at the beginning, move back one position
      setStartIndex(startIndex - 1);
    } else {
      // If at the beginning, loop to the end
      setStartIndex(maxIndex);
    }
  };

  // Get the current visible phrases
  const visiblePhrases = flashcards.slice(startIndex, startIndex + 3);

  return (
    <div className={styles.container}>
      {/* Header section with title and "See All" button */}
      <div className={styles.header}>
        <h1 className={styles.title}>Common Phrases</h1>
        {/* <Link href="/phrases" className={styles.seeAllButton}>
          See All
        </Link> */}
      </div>
      
      {/* Main carousel container */}
      <div className={styles.carouselContainer}>
        {/* Grid layout for the three visible cards */}
        <div className={styles.carouselTrack}>
          {/* Display up to three phrase cards */}
          {!loading && visiblePhrases.map((phrase, index) => (
            <div key={phrase.flashcard_id} className={styles.cardContainer}>
              <Flashcard 
                title="Phrase" 
                letter={phrase.content} 
                href={`/flashcard/${phrase.flashcard_id}`}
                id={phrase.flashcard_id}
                isBookmarked={bookmarkedIds.has(phrase.flashcard_id)}
              />
            </div>
          ))}
          
          {/* Show placeholder cards if we have fewer than 3 phrases to show */}
          {!loading && visiblePhrases.length < 3 && Array(3 - visiblePhrases.length).fill(0).map((_, index) => (
            <div key={`placeholder-${index}`} className={styles.cardContainer} />
          ))}
          
          {/* Show loading placeholders */}
          {loading && Array(3).fill(0).map((_, index) => (
            <div key={`loading-${index}`} className={styles.cardContainer}>
              <div className={styles.loadingCard}>Loading...</div>
            </div>
          ))}
        </div>
        
        {/* Previous button - Left side navigation */}
        <button 
          onClick={handlePrev} 
          className={`${styles.navigationButton} ${styles.prevButton}`}
          aria-label="Previous phrase"
          disabled={loading || flashcards.length <= 3}
        >
          <span className={styles.leftArrow}></span>
        </button>
        
        {/* Next button - Right side navigation */}
        <button 
          onClick={handleNext} 
          className={`${styles.navigationButton} ${styles.nextButton}`}
          aria-label="Next phrase"
          disabled={loading || flashcards.length <= 3}
        >
          <span className={styles.rightArrow}></span>
        </button>
      </div>
    </div>
  );
};

export default PhrasesCarousel;