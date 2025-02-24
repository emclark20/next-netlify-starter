import React, { useState } from 'react';
import Flashcard from './Flashcard'; // Import your existing Flashcard component
import Link from 'next/link';
import styles from './AlphabetCarousel.module.css';

/**
 * AlphabetCarousel Component
 * 
 * A carousel that displays alphabet flashcards three at a time.
 * Allows navigation through all 26 letters with circular scrolling.
 * 
 * @returns {React.Component} The AlphabetCarousel component
 */
const AlphabetCarousel = () => {
  // Create an array of all 26 alphabet letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // State to track which index to start showing letters from
  const [startIndex, setStartIndex] = useState(0);
  
  // Calculate the maximum starting index (total letters minus visible count)
  const maxIndex = letters.length - 3; // We show 3 cards at a time
  
  /**
   * Handler for the "next" button
   * Advances the carousel by one letter or loops back to the beginning
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
   * Moves the carousel back by one letter or loops to the end
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

  return (
    <div className={styles.container}>
      {/* Header section with title and "See All" button */}
      <div className={styles.header}>
        <h1 className={styles.title}>Alphabet Library</h1>
        {/* <Link href="/alphabet" className={styles.seeAllButton}>
          See All
        </Link> */}
      </div>
      
      {/* Main carousel container */}
      <div className={styles.carouselContainer}>
        {/* Grid layout for the three visible cards */}
        <div className={styles.carouselTrack}>
          {/* First Card - Shows the letter at the current startIndex */}
          <div className={styles.cardContainer}>
            {startIndex < letters.length && (
              <Flashcard 
                title="Alphabet" 
                letter={letters[startIndex]} 
                href={`/alphabet/${letters[startIndex].toLowerCase()}`} 
              />
            )}
          </div>
          
          {/* Second Card - Shows the letter at startIndex + 1 */}
          <div className={styles.cardContainer}>
            {startIndex + 1 < letters.length && (
              <Flashcard 
                title="Alphabet" 
                letter={letters[startIndex + 1]} 
                href={`/alphabet/${letters[startIndex + 1].toLowerCase()}`} 
              />
            )}
          </div>
          
          {/* Third Card - Shows the letter at startIndex + 2 */}
          <div className={styles.cardContainer}>
            {startIndex + 2 < letters.length && (
              <Flashcard 
                title="Alphabet" 
                letter={letters[startIndex + 2]} 
                href={`/alphabet/${letters[startIndex + 2].toLowerCase()}`} 
              />
            )}
          </div>
        </div>
        
        {/* Previous button - Left side navigation */}
        <button 
          onClick={handlePrev} 
          className={`${styles.navigationButton} ${styles.prevButton}`}
          aria-label="Previous letter"
        >
          <span className={styles.leftArrow}></span>
        </button>
        
        {/* Next button - Right side navigation */}
        <button 
          onClick={handleNext} 
          className={`${styles.navigationButton} ${styles.nextButton}`}
          aria-label="Next letter"
        >
          <span className={styles.rightArrow}></span>
        </button>
      </div>
    </div>
  );
};

export default AlphabetCarousel;