import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BigFlashcard from '@components/BigFlashcard';
import AlphabetCarousel from '@components/AlphabetCarousel'; 
import PhrasesCarousel from '@components/PhrasesCarousel'; 
import styles from '@styles/FlashcardDetail.module.css';

export default function FlashcardDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch when ID is available (after hydration)
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
          
          {/* Right sidebar carousel */}
          <div className={styles.sidebar}>
            {flashcard && flashcard.category === 'Alphabet' ? (
              <AlphabetCarousel />
            ) : (
              <PhrasesCarousel />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}