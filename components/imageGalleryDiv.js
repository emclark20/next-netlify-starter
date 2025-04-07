'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageGalleryDiv({ 
  images = [],
  className = "",
  autoPlay = true,
  interval = 15000
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  if (images.length === 0) {
    return <div className={`gallery-empty ${className}`}>No images to display</div>;
  }
  
  return (
    <div className={`gallery-container ${className}`}>
      {/* Image container */}
      <div className="gallery-image-container">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`gallery-image-wrapper ${
              index === currentImageIndex ? 'active' : ''
            }`}
          >
            <Image 
              src={image} 
              width={400}
              height={300}
              alt={`Gallery image ${index + 1}`}
              className="gallery-image"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevImage}
            className="gallery-nav-button prev-button"
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            onClick={goToNextImage}
            className="gallery-nav-button next-button"
            aria-label="Next image"
          >
            →
          </button>
          
          {/* Indicator dots */}
          <div className="gallery-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`indicator-dot ${
                  index === currentImageIndex ? 'active' : ''
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      
      <style jsx>{`
        .gallery-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        
        .gallery-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .gallery-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        
        .gallery-image-wrapper.active {
          opacity: 1;
        }
        
        .gallery-image {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        .gallery-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(112, 153, 255, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        
        .prev-button {
          left: 10px;
        }
        
        .next-button {
          right: 10px;
        }
        
        .gallery-indicators {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        
        .indicator-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 185, 92, 0.5);
          border: none;
          cursor: pointer;
          padding: 0;
        }
        
        .indicator-dot.active {
          background: white;
        }
        
        .gallery-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          background: #f0f0f0;
          border-radius: 8px;
          color: #666;
        }
      `}</style>
    </div>
  );
}