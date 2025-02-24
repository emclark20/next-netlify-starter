import React, { useRef, useEffect } from 'react';

const cameraStyles = {
  /* container: {
    width: '100%',
    height: '100%'
  },*/
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'scaleX(-1)'
  }
};

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
    <div style={cameraStyles.container} className='camera-container'>
      <video 
        ref={videoRef}
        autoPlay
        playsInline
        style={cameraStyles.video}
      />
    </div>
  );
};

export default Camera;