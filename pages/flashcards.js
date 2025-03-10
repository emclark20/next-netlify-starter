import { useState } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import FlashcardGrid from '@components/FlashcardGrid';
import styles from '@styles/Flashcards.module.css';

export default function FlashcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // List of available categories
  const categories = [
    'Alphabet',
    'Common Words',
    'Greetings',
    'Family',
    'Numbers',
    'Colors',
    'Time',
    'Food'
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Flashcards | SignIE</title>
        <meta name="description" content="Browse ASL flashcards" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Flashcards</h1>
        
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
        </div>

        <FlashcardGrid category={selectedCategory} />
      </main>

      <Footer />
    </div>
  );
}