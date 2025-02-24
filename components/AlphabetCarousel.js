import React, { useState } from 'react';
import Flashcard from './Flashcard'; // Import your existing Flashcard component
import Link from 'next/link';

// Define all the inline styles used in the component
const styles = {
  // Main container for the entire carousel section
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '2rem auto',
  },
  // Header section containing the title and "See All" button
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  // Style for the "Alphabet Library" heading
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  // Style for the "See All" button
  seeAllButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '9999px',
    textDecoration: 'none',
    fontSize: '1.125rem',
  },
  // Container for the carousel and its navigation buttons
  carouselContainer: {
    position: 'relative',
  },
  // The track that contains the flashcards, using CSS Grid for horizontal layout
  carouselTrack: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Three equal columns
    gap: '1rem', // Space between cards
  },
  // Container for each individual flashcard
  cardContainer: {
    width: '100%',
  },
  // Base styles for both navigation buttons
  navigationButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer',
  },
  // Specific style for the previous button (left side)
  prevButton: {
    left: '-20px',
  },
  // Specific style for the next button (right side)
  nextButton: {
    right: '-20px',
  },
  // Style for buttons when they are disabled
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  // Custom arrow for the left button (using CSS borders to create a triangle)
  leftArrow: {
    width: '10px',
    height: '10px',
    borderTop: '2px solid #000',
    borderLeft: '2px solid #000',
    transform: 'rotate(-45deg)',
    display: 'inline-block',
  },
  // Custom arrow for the right button (using CSS borders to create a triangle)
  rightArrow: {
    width: '10px',
    height: '10px',
    borderTop: '2px solid #000',
    borderRight: '2px solid #000',
    transform: 'rotate(45deg)',
    display: 'inline-block',
  }
};

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
    <div style={styles.container}>
      {/* Header section with title and "See All" button */}
      <div style={styles.header}>
        <h1 style={styles.title}>Alphabet Library</h1>
         {/* <Link href="/alphabet" style={styles.seeAllButton}>
          See All
        </Link> */}
      </div>
      
      {/* Main carousel container */}
      <div style={styles.carouselContainer}>
        {/* Grid layout for the three visible cards */}
        <div style={styles.carouselTrack}>
          {/* First Card - Shows the letter at the current startIndex */}
          <div style={styles.cardContainer}>
            {startIndex < letters.length && (
              <Flashcard 
                title="Alphabet" 
                letter={letters[startIndex]} 
                href={`/alphabet/${letters[startIndex].toLowerCase()}`} 
              />
            )}
          </div>
          
          {/* Second Card - Shows the letter at startIndex + 1 */}
          <div style={styles.cardContainer}>
            {startIndex + 1 < letters.length && (
              <Flashcard 
                title="Alphabet" 
                letter={letters[startIndex + 1]} 
                href={`/alphabet/${letters[startIndex + 1].toLowerCase()}`} 
              />
            )}
          </div>
          
          {/* Third Card - Shows the letter at startIndex + 2 */}
          <div style={styles.cardContainer}>
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
          style={{
            ...styles.navigationButton,
            ...styles.prevButton
          }}
          aria-label="Previous letter"
        >
          <span style={styles.leftArrow}></span>
        </button>
        
        {/* Next button - Right side navigation */}
        <button 
          onClick={handleNext} 
          style={{
            ...styles.navigationButton,
            ...styles.nextButton
          }}
          aria-label="Next letter"
        >
          <span style={styles.rightArrow}></span>
        </button>
      </div>
    </div>
  );
};

export default AlphabetCarousel;