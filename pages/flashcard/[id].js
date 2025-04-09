// pages/flashcard/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BigFlashcard from '@components/BigFlashcard';
import Camera from '@components/Camera'; // Import your Camera component
import AlphabetCarousel from '@components/AlphabetCarousel';
import PhrasesCarousel from '@components/PhrasesCarousel';
import styles from '../../styles/FlashcardDetail.module.css';
import Tutorial from '@components/Tutorial';
import SignLanguageDetector from '@components/SignLanguageDetector';

export default function FlashcardDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data when id is available (after hydration)
    if (!id) return;

    const fetchFlashcard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/flashcards/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch flashcard');
        }
        const data = await response.json();
        setFlashcard(data.flashcard);
      } catch (err) {
        console.error('Error fetching flashcard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, [id]);

  // Get the letter or word being practiced
  const getCurrentContent = () => {
    if (!flashcard) return null;
    
    // For alphabet flashcards, extract the first letter
    if (flashcard.category === 'Alphabet') {
      return flashcard.content.charAt(0);
    }
    
    // For other categories, return null or the content if you want to practice whole words
    return null;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {loading
            ? 'Loading Flashcard'
            : flashcard
            ? `${flashcard.content} | ${flashcard.category} | SignIE`
            : 'Flashcard Not Found'}
        </title>
        <meta name="description" content="Learn American Sign Language with interactive flashcards" />
      </Head>

      <Header />
      <Tutorial />

      <main className={styles.main}>
        <div className={styles.contentGrid}>
          {/* Main flashcard area */}
          <div className={styles.mainContent}>
            {loading ? (
              <div className={styles.loading}>Loading flashcard...</div>
            ) : error ? (
              <div className={styles.error}>
                <p>{error}</p>
                <button
                  className={styles.backButton}
                  onClick={() => router.push('/flashcards')}
                >
                  Back to Flashcards
                </button>
              </div>
            ) : flashcard ? (
              <BigFlashcard
                id={flashcard.flashcard_id}
                category={flashcard.category}
                content={flashcard.content}
                videoContent={flashcard.video_content}
              />
            ) : (
              <div className={styles.error}>
                <p>Flashcard not found</p>
                <button
                  className={styles.backButton}
                  onClick={() => router.push('/flashcards')}
                >
                  Back to Flashcards
                </button>
              </div>
            )}
          </div>
          
          {/* Camera component with proper height and target letter */}
          <div className={styles.cameraContainer} style={{ height: '400px', position: 'relative' }}>
            <h3 className={styles.practiceHeading}>Practice Sign</h3>
            {!loading && flashcard && (
              <Camera targetLetter={getCurrentContent()} />
            )}
            {!loading && flashcard && (
              <p className={styles.practiceInstructions}>
                Show the sign for {flashcard.category === 'Alphabet' ? `letter "${flashcard.content}"` : `"${flashcard.content}"`}
              </p>
            )}
          </div>
        </div>
        
        {/* Add carousels below the main content */}
        <div className={styles.carouselsSection}>
          <AlphabetCarousel />
          <PhrasesCarousel />
        </div>
  
      </main>
      
      <Footer />
    </div>
  );
}