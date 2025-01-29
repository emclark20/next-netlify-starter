// pages/practice.js
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

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
};

// Card Section Component
const CardSection = ({ title, cards }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

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
        <button 
          onClick={() => scroll('left')}
          className="scroll-button left"
        >
          ←
        </button>
        <div 
          ref={scrollContainerRef}
          className="scroll-container"
        >
          {cards}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="scroll-button right"
        >
          →
        </button>
      </div>
    </div>
  );
};

// Main Practice Page
const PracticePage = () => {
  return (
    <div className="practice-container">
      <div className="practice-grid">
        <div className="libraries-container">
          <CardSection
            title="Alphabet Library"
            cards={['A', 'B', 'C'].map(letter => (
              <Card
                key={letter}
                type="Alphabet"
                content={letter}
                href={`/learn/alphabet/${letter}`}
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
  );
};

export default PracticePage;