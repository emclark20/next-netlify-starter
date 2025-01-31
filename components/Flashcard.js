import { useState } from 'react';

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-96 h-64">
      <div
        className={`w-full h-full transition-transform duration-700 transform-gpu relative ${
          isFlipped ? 'rotate-y-180' : ''
        } preserve-3d`}
      >
        {/* Front of card */}
        <div className={`absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden ${
          isFlipped ? 'invisible' : ''
        }`}>
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-semibold text-gray-800">Front of Card</p>
          </div>
        </div>

        {/* Back of card (Video) */}
        <div className={`absolute w-full h-full bg-black rounded-lg shadow-lg overflow-hidden rotate-y-180 backface-hidden ${
          !isFlipped ? 'invisible' : ''
        }`}>
          <video 
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          >
            <source src="/api/placeholder/400/320" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Flip button */}
        <button
          onClick={handleFlip}
          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors z-10"
        >
          FLIP
        </button>
      </div>
    </div>
  );
};

export default Flashcard;

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
} */