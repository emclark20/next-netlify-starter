// components/BasicCamera.js
import React, { useRef, useEffect, useState } from 'react';

const BasicCamera = () => {
  const videoRef = useRef(null);
  const [hasWebcamPermission, setHasWebcamPermission] = useState(false);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasWebcamPermission(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasWebcamPermission(false);
      }
    };

    startWebcam();

    // Cleanup function to stop the webcam when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-container" style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: '#FFE4B5', // Same peach color from the original
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {hasWebcamPermission ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '1rem',
          color: '#666'
        }}>
          Please allow camera access to practice signing
        </div>
      )}
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        fontSize: '16px'
      }}>
        Practice your sign in front of the camera
      </div>
    </div>
  );
};

export default BasicCamera;