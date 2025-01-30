import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

// ContentSection.tsx
// ContentSection.js
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './ContentSection.module.css';


const ContentSection = () => {
  const videoRef = useRef(null);
  const [hasWebcamPermission, setHasWebcamPermission] = useState(false);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasWebcamPermission(true);
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setHasWebcamPermission(false);
      }
    };

    startWebcam();

    // Cleanup function to stop the webcam when component unmounts
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
        <Header/>
    
    <div className={styles.container}>
      <div className={styles.contentLayout}>
        {/* Video Player Section */}
        <div className={styles.videoContainer}>
          <video 
            className={styles.mainVideo}
            controls
            poster="/path-to-your-thumbnail.jpg" // Optional: Add a thumbnail
          >
            <source src="/videos/aResized.mp4" type="video/mp4" width={700} />
            Your browser does not support the video tag.
          </video>
          <div className={styles.navigationButtons}>
            <ChevronLeft size={24} />
            <ChevronRight size={24} />
          </div>
        </div>

        {/* Webcam Section */}
        <div className={styles.webcamContainer}>
          {hasWebcamPermission ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={styles.webcamVideo}
            />
          ) : (
            <div className={styles.webcamFallback}>
              Please allow camera access
            </div>
          )}
        </div>
      </div>

      {/* Library Section */}
      <div className={styles.librarySection}>
        <div className={styles.libraryHeader}>
          <h2>Alphabet Library</h2>
          <button className={styles.seeAll}>See All</button>
        </div>

        <div className={styles.carouselContainer}>
          <button className={styles.carouselButton}>
            <ChevronLeft size={32} />
          </button>
          
          <div className={styles.carouselTrack}>
            {['B', 'C', 'D'].map((word) => (
              <div key={word} className={styles.wordCard}>
                <div className={styles.cardHeader}>Common Words</div>
                <div className={styles.cardContent}>{word}</div>
              </div>
            ))}
          </div>

          <button className={`${styles.carouselButton} ${styles.rightButton}`}>
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div></div>
  );
};

export default ContentSection;