'use client';
// FlashCard.jsx
import { useState } from 'react';

const FlashCard = ({ frontContent, videoUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        <div className="flashcard-front">
          {frontContent}
        </div>
        <div className="flashcard-back">
          <video controls width="100%" height="100%">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <style jsx>{`
        .flashcard-container {
          perspective: 1000px;
          width: 300px;
          height: 200px;
          margin: 20px;
        }

        .flashcard {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        .flashcard-front,
        .flashcard-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .flashcard-front {
          background-color: #ffffff;
          border: 2px solid #e0e0e0;
          padding: 20px;
          font-size: 1.2rem;
          text-align: center;
        }

        .flashcard-back {
          background-color: #f5f5f5;
          transform: rotateY(180deg);
          overflow: hidden;
        }

        video {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default FlashCard;

// Usage Example:
/*
import FlashCard from './components/FlashCard';

export default function Page() {
  return (
    <FlashCard 
      frontContent="What is the capital of France?"
      videoUrl="/path-to-your-video.mp4"
    />
  );
}
*/