// pages/practice.js
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Flashcard from '@components/Flashcard';
import TutorialModal from '@components/Tutorial';
import Camera from '@components/Camera';
import styles from './practice.module.css'; 

// Card Component
const Card = ({ type, content, href }) => {
  return (
    <Link href={href} className="card">
      <div className="card-header">
        <h3>{type}</h3>
      </div>
      <div className="card-content">
        {content}
      </div>
    </Link>
  );
};

// Camera Component
/*
const Camera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
      />
    </div>
  );
}; */

// Card Section Component
const CardSection = ({ title, cards }) => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction) => {
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 3)
      : Math.min(cards.length - 3, currentIndex + 3);
    
    setCurrentIndex(newIndex);
    
    const container = scrollContainerRef.current;
    container.style.transform = `translateX(-${newIndex * (100/3)}%)`;
  };

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + 3 < cards.length;

  return (
    <div className="card-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <Link 
          href={`/library/${title.toLowerCase().replace(' ', '-')}`}
          className="see-all-btn"
        >
          See All
        </Link>
      </div>
      <div className="card-scroller">
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="scroll-button left"
            aria-label="Scroll left"
          >
            ←
          </button>
        )}
        <div 
          ref={scrollContainerRef}
          className="scroll-container"
          style={{
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          {visibleCards}
        </div>
        {canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="scroll-button right"
            aria-label="Scroll right"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

// Main Practice Page
const PracticePage = () => {
  // Create an array of alphabet letters
  const alphabetLetters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  return (
    <div>
      <TutorialModal />
      <Header />
      
    <div className="practice-container">
      <div className="practice-grid">
        <div className="libraries-container">
          <CardSection
            title="Alphabet Library"
            cards={alphabetLetters.map(letter => (
              <Card
                key={letter}
                type="Alphabet"
                content={letter}
                /*href={`/learn/alphabet/${letter.toLowerCase()}`}*/
                href={'/learningPgs50/learningA'}
              />
            ))}
          />

          <CardSection
            title="Common Words Library"
            cards={['Aunt', 'Uncle', 'Goodbye'].map(word => (
              <Card
                key={word}
                type="Common Words"
                content={word}
                href={`/learn/words/${word.toLowerCase()}`}
              />
            ))}
          />

          <CardSection
            title="Your Bookmarks"
            cards={['Deaf', 'Hungry', 'We'].map(word => (
              <Card
                key={word}
                type="Common Words"
                content={word}
                href={`/learn/words/${word.toLowerCase()}`}
              />
            ))}
          />
        </div>

        <div>
          <Camera />
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PracticePage;