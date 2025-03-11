import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import FlashcardGrid from '@components/FlashcardGrid';
import styles from '@styles/Flashcards.module.css';

export default function FlashcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Base categories
  const categories = [
    'Alphabet',
    'Common Phrases'
  ];

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user/profile');
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Flashcards | SignIE</title>
        <meta name="description" content="Browse ASL flashcards" />
      </Head>
      
      <Header />
      
      <main className={styles.main}>
        <h1 className={styles.title}>Pick A Flashcard To Start Learning</h1>
        
        <div className={styles.categoryFilter}>
          <button
            className={`${styles.categoryButton} ${selectedCategory === null ? styles.active : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          
          {/* Bookmarked category - only shown if user is authenticated */}
          {isAuthenticated && (
            <button
              className={`${styles.categoryButton} ${selectedCategory === 'Bookmarked' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('Bookmarked')}
            >
              Bookmarked
            </button>
          )}
        </div>
        
        <FlashcardGrid category={selectedCategory} />
      </main>
      
      <Footer />
    </div>
  );
}