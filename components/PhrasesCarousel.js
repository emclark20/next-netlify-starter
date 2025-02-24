import React, { useState } from 'react';
import Flashcard from './Flashcard'; // Import your existing Flashcard component
import Link from 'next/link';
import styles from './PhrasesCarousel.module.css';

/**
 * PhraseCarousel Component
 * 
 * A carousel that displays common ASL phrases three at a time.
 * Allows navigation through all 24 phrases with circular scrolling.
 * 
 * @returns {React.Component} The PhraseCarousel component
 */
const PhraseCarousel = () => {
  // Create an array of all 24 common phrases
  const phrases = [
    "Hi",
    "Goodbye",
    "I am",
    "You are",
    "We are",
    "Yes",
    "No",
    "Please",
    "Thank you",
    "You're welcome",
    "Mom",
    "Dad",
    "Sister",
    "Brother",
    "Hearing",
    "Deaf",
    "Name",
    "She is",
    "He is",
    "They are",
    "Slow down",
    "Repeat",
    "Practice",
    "Learning ASL"
  ];
  
  // State to track which index to start showing phrases from
  const [startIndex, setStartIndex] = useState(0);
  
  // Calculate the maximum starting index (total phrases minus visible count)
  const maxIndex = phrases.length - 3; // We show 3 cards at a time
  
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

  // Function to convert phrase to URL-friendly format
  const formatUrlPath = (phrase) => {
    return phrase.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
  };

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
          {/* First Card - Shows the phrase at the current startIndex */}
          <div className={styles.cardContainer}>
            {startIndex < phrases.length && (
              <Flashcard 
                title="Phrase" 
                letter={phrases[startIndex]} 
                href={`/phrases/${formatUrlPath(phrases[startIndex])}`} 
              />
            )}
          </div>
          
          {/* Second Card - Shows the phrase at startIndex + 1 */}
          <div className={styles.cardContainer}>
            {startIndex + 1 < phrases.length && (
              <Flashcard 
                title="Phrase" 
                letter={phrases[startIndex + 1]} 
                href={`/phrases/${formatUrlPath(phrases[startIndex + 1])}`} 
              />
            )}
          </div>
          
          {/* Third Card - Shows the phrase at startIndex + 2 */}
          <div className={styles.cardContainer}>
            {startIndex + 2 < phrases.length && (
              <Flashcard 
                title="Phrase" 
                letter={phrases[startIndex + 2]} 
                href={`/phrases/${formatUrlPath(phrases[startIndex + 2])}`} 
              />
            )}
          </div>
        </div>
        
        {/* Previous button - Left side navigation */}
        <button 
          onClick={handlePrev} 
          className={`${styles.navigationButton} ${styles.prevButton}`}
          aria-label="Previous phrase"
        >
          <span className={styles.leftArrow}></span>
        </button>
        
        {/* Next button - Right side navigation */}
        <button 
          onClick={handleNext} 
          className={`${styles.navigationButton} ${styles.nextButton}`}
          aria-label="Next phrase"
        >
          <span className={styles.rightArrow}></span>
        </button>
      </div>
    </div>
  );
};

export default PhraseCarousel;