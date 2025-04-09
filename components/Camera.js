import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const cameraStyles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10
  },
  feedbackBox: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 20,
    textAlign: 'center',
    fontSize: '16px'
  },
  targetBox: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 20,
    fontSize: '24px',
    fontWeight: 'bold'
  },
  successIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    color: 'white',
    padding: '20px',
    borderRadius: '50%',
    zIndex: 20,
    fontSize: '36px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '120px'
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    zIndex: 30,
    textAlign: 'center'
  }
};

// ASL alphabet letters (excluding J and Z which require motion)
const letterClasses = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'
];

// Letter-specific confidence thresholds
// Customize these values for each letter based on detection difficulty
const letterThresholds = {
  'A': 0.3,  // Easy to detect
  'B': 0.3,
  'C': 0.4, //customized
  'D': 0.35,
  'E': 0.4,  // Harder to detect
  'F': 0.35,
  'G': 0.35,
  'H': 0.4,
  'I': 0.3,
  'K': 0.4,
  'L': 0.3,  // Easy to detect
  'M': 0.45, // Harder to detect
  'N': 0.45, // Harder to detect
  'O': 0.35,
  'P': 0.4,
  'Q': 0.4,
  'R': 0.45, // Harder to detect
  'S': 0.4,
  'T': 0.4,
  'U': 0.35,
  'V': 0.3,  // Easy to detect
  'W': 0.35,
  'X': 0.4,
  'Y': 0.3,  // Easy to detect
  'default': 0.3 // Default threshold for any unspecified letters
};

const Camera = ({ targetLetter = null, customThresholds = null }) => {
  // Refs for video and canvas elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // State management
  const [handposeModel, setHandposeModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState('Loading hand detection model...');
  const [lastDetectionTime, setLastDetectionTime] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(null);
  
  // Combine default thresholds with any custom thresholds provided
  const thresholds = { ...letterThresholds, ...customThresholds };
  
  // Initialize handpose model and camera
  useEffect(() => {
    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
              width: 640,
              height: 480,
              facingMode: 'user'
            }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing webcam:', error);
          setFeedback('Camera access error. Please check permissions.');
        }
      }
    };
    
    const loadModels = async () => {
      try {
        // Load the handpose model
        console.log('Loading handpose model...');
        const handModel = await handpose.load();
        setHandposeModel(handModel);
        console.log('Handpose model loaded');
        setIsLoading(false);
        setFeedback('Position your hand in view');
      } catch (error) {
        console.error('Error loading models:', error);
        setFeedback('Error loading hand detection model.');
        setIsLoading(false);
      }
    };
    
    setupCamera();
    loadModels();
    
    return () => {
      // Clean up webcam on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Hand landmark detection loop
  useEffect(() => {
    let requestId;
    
    const detectHands = async (timestamp) => {
      if (handposeModel && videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Check if video is ready
        if (video.readyState === 4) {
          // Get video dimensions
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          
          // Set canvas dimensions to match video
          canvas.width = videoWidth;
          canvas.height = videoHeight;
          
          // Draw video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          try {
            // Make prediction with handpose model
            const hands = await handposeModel.estimateHands(video);
            
            if (hands.length > 0) {
              // We found at least one hand
              // Draw hand landmarks
              drawHandLandmarks(hands[0], ctx);
              
              // Process hand landmarks for sign detection
              const landmarks = hands[0].landmarks;
              
              // Only check for target letter
              if (targetLetter && letterClasses.includes(targetLetter.toUpperCase())) {
                checkForTargetLetter(landmarks, targetLetter.toUpperCase());
              }
            } else {
              // No hands detected
              setIsSuccess(false);
              setConfidenceScore(null);
              setFeedback('Position your hand in view');
            }
          } catch (error) {
            console.error('Error during hand detection:', error);
            setFeedback('Detection error. Please try again.');
          }
        }
        
        requestId = requestAnimationFrame(detectHands);
      }
    };
    
    if (handposeModel) {
      requestId = requestAnimationFrame(detectHands);
    }
    
    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [handposeModel, targetLetter]);
  
  // Draw hand landmarks on canvas
  const drawHandLandmarks = (hand, ctx) => {
    const landmarks = hand.landmarks;
    
    // Draw landmarks
    for (let i = 0; i < landmarks.length; i++) {
      const [x, y, z] = landmarks[i];
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.fill();
      
      // Inner white circle
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    }
    
    // Connect landmarks with lines to visualize the hand
    const fingerJoints = [
      // Thumb
      [0, 1, 2, 3, 4],
      // Index finger
      [0, 5, 6, 7, 8],
      // Middle finger
      [0, 9, 10, 11, 12],
      // Ring finger
      [0, 13, 14, 15, 16],
      // Pinky
      [0, 17, 18, 19, 20]
    ];
    
    // Draw lines
    for (let finger of fingerJoints) {
      for (let i = 0; i < finger.length - 1; i++) {
        const [x1, y1] = landmarks[finger[i]];
        const [x2, y2] = landmarks[finger[i + 1]];
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255, 100, 255, 0.8)';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }
  };
  
  // Check for target letter
  const checkForTargetLetter = (landmarks, targetLetterUpper) => {
    // Extract features from landmarks
    const features = extractFeatures(landmarks);
    
    // Calculate similarity with target letter
    const score = compareWithReferencePosition(features, targetLetterUpper);
    
    // Get the threshold for this letter
    const threshold = thresholds[targetLetterUpper] || thresholds.default;
    
    // Update state based on score
    const now = Date.now();
    if (now - lastDetectionTime > 300) { // Update feedback every 300ms
      setLastDetectionTime(now);
      setConfidenceScore(score);
      
      // Show success if score is higher than the letter-specific threshold
      if (score > threshold) {
        setIsSuccess(true);
        setFeedback(`Good job! ${targetLetterUpper} sign detected (${Math.round(score * 100)}% match)`);
      } else {
        setIsSuccess(false);
        setFeedback(`Keep trying to make the sign for ${targetLetterUpper} (${Math.round(score * 100)}% match)`);
      }
    }
  };
  
  // Extract features from hand landmarks
  const extractFeatures = (landmarks) => {
    // Basic normalization
    // 1. Find center of palm (landmark 0)
    const palmCenter = landmarks[0];
    
    // 2. Normalize all points relative to palm center
    const normalizedLandmarks = landmarks.map(point => [
      point[0] - palmCenter[0],
      point[1] - palmCenter[1],
      point[2] - palmCenter[2]
    ]);
    
    // 3. Calculate distances between fingertips and palm
    const fingertips = [4, 8, 12, 16, 20]; // Indices of fingertips
    const fingertipDistances = fingertips.map(index => {
      const tip = normalizedLandmarks[index];
      // Euclidean distance in 3D space
      return Math.sqrt(tip[0]**2 + tip[1]**2 + tip[2]**2);
    });
    
    // 4. Measure finger bending (angle at each finger joint)
    const fingerBend = [];
    const fingerJoints = [
      [1, 2, 3, 4],        // Thumb
      [5, 6, 7, 8],        // Index finger
      [9, 10, 11, 12],     // Middle finger
      [13, 14, 15, 16],    // Ring finger
      [17, 18, 19, 20]     // Pinky
    ];
    
    for (const finger of fingerJoints) {
      let totalBend = 0;
      for (let i = 0; i < finger.length - 2; i++) {
        const p1 = normalizedLandmarks[finger[i]];
        const p2 = normalizedLandmarks[finger[i+1]];
        const p3 = normalizedLandmarks[finger[i+2]];
        
        // Vectors between points
        const v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
        const v2 = [p3[0] - p2[0], p3[1] - p2[1], p3[2] - p2[2]];
        
        // Normalize vectors
        const v1Mag = Math.sqrt(v1[0]**2 + v1[1]**2 + v1[2]**2);
        const v2Mag = Math.sqrt(v2[0]**2 + v2[1]**2 + v2[2]**2);
        
        if (v1Mag > 0 && v2Mag > 0) {
          // Dot product
          const dotProduct = v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
          // Angle in radians
          const angle = Math.acos(Math.min(1, Math.max(-1, dotProduct / (v1Mag * v2Mag))));
          totalBend += angle;
        }
      }
      fingerBend.push(totalBend);
    }
    
    // Return combined features
    return {
      tipDistances: fingertipDistances,
      bends: fingerBend
    };
  };
  
  // Compare landmarks with reference position
  const compareWithReferencePosition = (features, letter) => {
    // Reference data for ASL letters
    const references = {
      'A': { 
        // Thumb extended, all fingers closed in a fist
        tipDistances: [0.5, 0.2, 0.2, 0.2, 0.2],
        bends: [0.1, 1.5, 1.5, 1.5, 1.5]
      },
      'B': { 
  // More precise B sign: All fingers fully extended, tightly together, thumb tucked
  tipDistances: [0.1, 0.9, 0.9, 0.9, 0.9],  // Thumb closer to hand, other fingers very extended
  bends: [0.3, 0.05, 0.05, 0.05, 0.05]      // Minimal bending, thumb slightly curved
},
      
      'C': { 
        // Curved hand
        tipDistances: [0.5, 0.6, 0.6, 0.6, 0.5],
        bends: [0.6, 0.7, 0.7, 0.7, 0.7]
      },
      'D': {
        // Index extended, others closed
        tipDistances: [0.3, 0.8, 0.3, 0.3, 0.3],
        bends: [0.6, 0.2, 1.5, 1.5, 1.5]
      },
      'E': {
        // All fingers curled
        tipDistances: [0.3, 0.3, 0.3, 0.3, 0.3],
        bends: [1.0, 1.2, 1.2, 1.2, 1.2]
      },
      'F': {
        // Index and thumb connected, others extended
        tipDistances: [0.3, 0.3, 0.7, 0.7, 0.7],
        bends: [0.5, 1.0, 0.3, 0.3, 0.3]
      },
      'G': {
        // Index pointing, thumb extended sideways
        tipDistances: [0.5, 0.8, 0.3, 0.3, 0.3],
        bends: [0.3, 0.2, 1.5, 1.5, 1.5]
      },
      'H': {
        // Index and middle extended together
        tipDistances: [0.4, 0.8, 0.8, 0.3, 0.3],
        bends: [0.5, 0.2, 0.2, 1.5, 1.5]
      },
      'I': {
        // Pinky extended, others closed
        tipDistances: [0.3, 0.3, 0.3, 0.3, 0.8],
        bends: [1.0, 1.5, 1.5, 1.5, 0.2]
      },
      'K': {
        // Index and middle extended in V shape
        tipDistances: [0.4, 0.8, 0.8, 0.3, 0.3],
        bends: [0.5, 0.2, 0.2, 1.5, 1.5]
      },
      'L': {
        // L shape with thumb and index
        tipDistances: [0.7, 0.8, 0.3, 0.3, 0.3],
        bends: [0.1, 0.2, 1.5, 1.5, 1.5]
      },
      'M': {
        // Thumb between ring and pinky, all fingers down
        tipDistances: [0.3, 0.3, 0.3, 0.3, 0.3],
        bends: [1.0, 1.2, 1.2, 1.2, 1.2]
      },
      'N': {
        // Thumb between middle and ring, all fingers down
        tipDistances: [0.3, 0.3, 0.3, 0.3, 0.3],
        bends: [1.0, 1.2, 1.2, 1.2, 1.2]
      },
      'O': {
        // Rounded O shape
        tipDistances: [0.4, 0.4, 0.4, 0.4, 0.4],
        bends: [0.8, 0.8, 0.8, 0.8, 0.8]
      },
      'P': {
        // P shape, thumb and index extended downward
        tipDistances: [0.4, 0.6, 0.3, 0.3, 0.3],
        bends: [0.6, 0.8, 1.5, 1.5, 1.5]
      },
      'Q': {
        // Q shape, similar to G but pointing down
        tipDistances: [0.5, 0.7, 0.3, 0.3, 0.3],
        bends: [0.3, 0.7, 1.5, 1.5, 1.5]
      },
      'R': {
        // R shape, index and middle crossed
        tipDistances: [0.3, 0.7, 0.7, 0.3, 0.3],
        bends: [0.5, 0.3, 0.3, 1.5, 1.5]
      },
      'S': {
        // Fist with thumb over fingers
        tipDistances: [0.3, 0.2, 0.2, 0.2, 0.2],
        bends: [0.7, 1.5, 1.5, 1.5, 1.5]
      },
      'T': {
        // T shape, thumb between index and middle
        tipDistances: [0.4, 0.3, 0.3, 0.3, 0.3],
        bends: [0.3, 1.0, 1.0, 1.0, 1.0]
      },
      'U': {
        // Index and middle extended together
        tipDistances: [0.3, 0.8, 0.8, 0.3, 0.3],
        bends: [0.7, 0.2, 0.2, 1.5, 1.5]
      },
      'V': {
        // V shape with index and middle
        tipDistances: [0.3, 0.8, 0.8, 0.3, 0.3],
        bends: [0.7, 0.2, 0.2, 1.5, 1.5]
      },
      'W': {
        // W shape with 3 middle fingers
        tipDistances: [0.3, 0.8, 0.8, 0.8, 0.3],
        bends: [0.7, 0.2, 0.2, 0.2, 1.5]
      },
      'X': {
        // Index bent at middle joint
        tipDistances: [0.3, 0.5, 0.3, 0.3, 0.3],
        bends: [0.7, 1.0, 1.5, 1.5, 1.5]
      },
      'Y': {
        // Thumb and pinky extended
        tipDistances: [0.7, 0.3, 0.3, 0.3, 0.8],
        bends: [0.2, 1.5, 1.5, 1.5, 0.2]
      },
      'default': {
        tipDistances: [0.5, 0.5, 0.5, 0.5, 0.5],
        bends: [0.5, 0.5, 0.5, 0.5, 0.5]
      }
    };
    
    // Get reference for this letter
    const reference = references[letter] || references.default;
    
    // Calculate similarity score
    let distanceScore = 0;
    let bendScore = 0;
    
    // Compare tip distances
    for (let i = 0; i < features.tipDistances.length; i++) {
      const refDistance = reference.tipDistances[i] || 0.5;
      const diff = Math.abs(features.tipDistances[i] - refDistance);
      distanceScore += 1 - Math.min(diff, 1);
    }
    
    // Compare finger bends
    for (let i = 0; i < features.bends.length; i++) {
      const refBend = reference.bends[i] || 0.5;
      const diff = Math.abs(features.bends[i] - refBend);
      bendScore += 1 - Math.min(diff, 1);
    }
    
    // Normalize scores between 0 and 1
    distanceScore /= features.tipDistances.length;
    bendScore /= features.bends.length;
    
    // Combined score weighted average
    return 0.4 * distanceScore + 0.6 * bendScore;
  };

  return (
    <div style={cameraStyles.container} className='camera-container'>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={cameraStyles.video}
      />
      <canvas
        ref={canvasRef}
        style={cameraStyles.canvas}
      />
      
      {/* Show target letter */}
      {targetLetter && (
        <div style={cameraStyles.targetBox}>
          Target: {targetLetter.toUpperCase()}
        </div>
      )}
      
      {/* Show feedback */}
      <div style={cameraStyles.feedbackBox}>
        {feedback}
      </div>
      
      {/* Show loading indicator */}
      {isLoading && (
        <div style={cameraStyles.loadingIndicator}>
          Loading hand detection model...
        </div>
      )}
      
      {/* Show success indicator */}
      {isSuccess && (
        <div style={cameraStyles.successIndicator}>
          ✓
        </div>
      )}
    </div>
  );
};

export default Camera;