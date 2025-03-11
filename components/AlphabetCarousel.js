import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard'; // Import your existing Flashcard component
import Link from 'next/link';
import styles from './AlphabetCarousel.module.css';

/**
 * AlphabetCarousel Component
 * 
 * A carousel that displays alphabet flashcards three at a time with bookmark functionality.
 * Allows navigation through all 26 letters with circular scrolling.
 * 
 * @returns {React.Component} The AlphabetCarousel component
 */
const AlphabetCarousel = () => {
  // Create an array of all 26 alphabet letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // State to track which index to start showing letters from
  const [startIndex, setStartIndex] = useState(0);
  
  // State to store flashcard data from the database
  const [flashcards, setFlashcards] = useState([]);
  
  // State to track bookmarked flashcards
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // Calculate the maximum starting index (total letters minus visible count)
  const maxIndex = letters.length - 3; // We show 3 cards at a time
  
  // Fetch flashcards and bookmarks from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch alphabet flashcards
        const flashcardsResponse = await fetch('/api/flashcards?category=Alphabet');
        
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

  /**
   * Find a flashcard by its content (letter)
   */
  const getFlashcardByLetter = (letter) => {
    return flashcards.find(card => card.content === letter) || null;
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
          {/* First Card */}
<div className={styles.cardContainer}>
  {startIndex < letters.length && !loading && (
    <Flashcard 
      title="Alphabet" 
      letter={letters[startIndex]} 
      href={`/flashcard/${getFlashcardByLetter(letters[startIndex])?.flashcard_id}`}
      id={getFlashcardByLetter(letters[startIndex])?.flashcard_id}
      isBookmarked={getFlashcardByLetter(letters[startIndex]) ? 
        bookmarkedIds.has(getFlashcardByLetter(letters[startIndex]).flashcard_id) : false}
    />
  )}
</div>

{/* Second Card */}
<div className={styles.cardContainer}>
  {startIndex + 1 < letters.length && !loading && (
    <Flashcard 
      title="Alphabet" 
      letter={letters[startIndex + 1]} 
      href={`/flashcard/${getFlashcardByLetter(letters[startIndex + 1])?.flashcard_id}`}
      id={getFlashcardByLetter(letters[startIndex + 1])?.flashcard_id}
      isBookmarked={getFlashcardByLetter(letters[startIndex + 1]) ? 
        bookmarkedIds.has(getFlashcardByLetter(letters[startIndex + 1]).flashcard_id) : false}
    />
  )}
</div>

{/* Third Card */}
<div className={styles.cardContainer}>
  {startIndex + 2 < letters.length && !loading && (
    <Flashcard 
      title="Alphabet" 
      letter={letters[startIndex + 2]} 
      href={`/flashcard/${getFlashcardByLetter(letters[startIndex + 2])?.flashcard_id}`}
      id={getFlashcardByLetter(letters[startIndex + 2])?.flashcard_id}
      isBookmarked={getFlashcardByLetter(letters[startIndex + 2]) ? 
        bookmarkedIds.has(getFlashcardByLetter(letters[startIndex + 2]).flashcard_id) : false}
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