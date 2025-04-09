import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const SignLanguageDetector = () => {
  // Refs for video and canvas elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // ASL alphabet letters (excluding J and Z which require motion)
  const letterClasses = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'
  ];
  
  // State management - declare all states first before any other code
  const [handposeModel, setHandposeModel] = useState(null);
  const [classifierModel, setClassifierModel] = useState(null);
  const [detectedSign, setDetectedSign] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentLetter, setCurrentLetter] = useState('A');
  const [letterProgress, setLetterProgress] = useState({});
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastDetectionTime, setLastDetectionTime] = useState(0);
  const [detectionInterval, setDetectionInterval] = useState(100); // milliseconds between detections
  const [minConfidence, setMinConfidence] = useState(0.5); // minimum confidence threshold
  
  // Track mastery level for each letter (0-100%)
  const [letterMastery, setLetterMastery] = useState(() => {
    // Initialize with 0% mastery for each letter
    const initialMastery = {};
    letterClasses.forEach(letter => {
      initialMastery[letter] = 0;
    });
    return initialMastery;
  });
  
  // Load progress from local storage
  useEffect(() => {
    try {
      const savedMastery = localStorage.getItem('asl-letter-mastery');
      if (savedMastery) {
        setLetterMastery(JSON.parse(savedMastery));
      }
      
      const savedProgress = localStorage.getItem('asl-letter-progress');
      if (savedProgress) {
        setLetterProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading progress from local storage:', error);
    }
  }, []);
  
  // Save progress to local storage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('asl-letter-mastery', JSON.stringify(letterMastery));
    } catch (error) {
      console.error('Error saving mastery to local storage:', error);
    }
  }, [letterMastery]);
  
  useEffect(() => {
    try {
      localStorage.setItem('asl-letter-progress', JSON.stringify(letterProgress));
    } catch (error) {
      console.error('Error saving progress to local storage:', error);
    }
  }, [letterProgress]);
  
  // Initialize models and webcam
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
        
        // Here you would load your custom classifier model
        // For example:
        // const classifier = await tf.loadLayersModel('path/to/your/model.json');
        // setClassifierModel(classifier);
        
        // For now, just log a placeholder message
        console.log('Custom classifier would be loaded here');
        
        // Once models are loaded, start detection
        setIsDetecting(true);
      } catch (error) {
        console.error('Error loading models:', error);
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
    let lastDetectionTimestamp = 0;
    
    const detectHands = async (timestamp) => {
      if (handposeModel && videoRef.current && canvasRef.current && isDetecting) {
        // Check if enough time has passed since the last detection
        if (timestamp - lastDetectionTimestamp >= detectionInterval) {
          lastDetectionTimestamp = timestamp;
          
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
            
            // Make prediction with handpose model
            const hands = await handposeModel.estimateHands(video);
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw video frame
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            if (hands.length > 0) {
              // We found at least one hand
              // Draw hand landmarks
              drawHandLandmarks(hands[0], ctx);
              
              // Process hand landmarks for classification
              const landmarks = hands[0].landmarks;
              
              // Classify the sign
              classifySign(landmarks);
            } else {
              // No hands detected
              setDetectedSign(null);
              setConfidenceScore(null);
              setFeedback('No hand detected. Please position your hand in view.');
            }
          }
        }
        
        // Continue detection loop
        requestId = requestAnimationFrame(detectHands);
      }
    };
    
    if (isDetecting) {
      requestId = requestAnimationFrame(detectHands);
    }
    
    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [handposeModel, isDetecting, currentLetter, detectionInterval, minConfidence]);
  
  // Draw hand landmarks on canvas
  const drawHandLandmarks = (hand, ctx) => {
    const landmarks = hand.landmarks;
    
    // Draw landmarks
    for (let i = 0; i < landmarks.length; i++) {
      const [x, y, z] = landmarks[i];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
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
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };
  
  // Process landmarks and classify sign
  const classifySign = (landmarks) => {
    // Extract features from landmarks
    const features = extractFeatures(landmarks);
    
    // Calculate distances to reference positions for each letter
    const letterPredictions = letterClasses.map(letter => {
      const score = compareWithReferencePosition(features, letter);
      return {
        letter,
        confidence: score
      };
    });
    
    // Sort by confidence (highest first)
    letterPredictions.sort((a, b) => b.confidence - a.confidence);
    
    // Get top prediction
    const topPrediction = letterPredictions[0];
    
    setDetectedSign(topPrediction.letter);
    setConfidenceScore(topPrediction.confidence.toFixed(2));
    
    // Provide feedback based on detection
    provideFeedback(topPrediction.letter, topPrediction.confidence);
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
    
    // 4. Calculate angles between fingers
    const fingerBases = [1, 5, 9, 13, 17]; // Indices of finger bases
    const fingerAngles = [];
    
    for (let i = 0; i < fingerBases.length - 1; i++) {
      const baseA = normalizedLandmarks[fingerBases[i]];
      const baseB = normalizedLandmarks[fingerBases[i+1]];
      
      // Calculate 2D angle in the x-y plane
      const angle = Math.atan2(baseB[1] - baseA[1], baseB[0] - baseA[0]);
      fingerAngles.push(angle);
    }
    
    // 5. Measure finger bending (angle at each finger joint)
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
      angles: fingerAngles,
      bends: fingerBend,
      normalizedLandmarks
    };
  };
  
  // Hard-coded reference positions for each letter
  // This is a simple approach - ideally you would train a proper classifier
  const compareWithReferencePosition = (features, letter) => {
    // These are approximate feature values for each letter
    // In a real implementation, these would come from training data
    const references = {
      'A': { 
        // Thumb extended, all fingers closed in a fist
        tipDistances: [0.5, 0.2, 0.2, 0.2, 0.2],
        bends: [0.1, 1.5, 1.5, 1.5, 1.5]
      },
      'B': { 
        // All fingers extended and together
        tipDistances: [0.3, 0.8, 0.8, 0.8, 0.8],
        bends: [0.8, 0.2, 0.2, 0.2, 0.2]
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
    
    // If no reference exists for this letter, use default
    const reference = references[letter] || references.default;
    
    // Calculate similarity score based on finger distances and bends
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
  
  // Provide feedback based on detection
  const provideFeedback = (detected, confidence) => {
    // Only count detections that are at least 0.5s apart to avoid rapid fluctuations
    const now = Date.now();
    const timeSinceLastDetection = now - lastDetectionTime;
    
    if (timeSinceLastDetection > 500) {
      setLastDetectionTime(now);
      setAttemptCount(prev => prev + 1);
      
      // Update the current letter's progress
      if (detected === currentLetter) {
        // Update consecutive correct count
        setConsecutiveCorrect(prev => prev + 1);
        
        // Update mastery level based on confidence and consecutive correct signs
        const masteryIncrease = confidence * 2; // Higher confidence means faster mastery
        setLetterMastery(prev => ({
          ...prev,
          [currentLetter]: Math.min(100, prev[currentLetter] + masteryIncrease)
        }));
        
        // Provide feedback based on confidence
        if (confidence > 0.9) {
          setFeedback(`Excellent! Your sign for "${currentLetter}" is very clear and accurate.`);
        } else if (confidence > 0.75) {
          setFeedback(`Good job! Your sign for "${currentLetter}" is clear.`);
        } else if (confidence > 0.6) {
          setFeedback(`Your sign for "${currentLetter}" is recognizable, but try to make it more distinct.`);
        } else {
          setFeedback(`I can tell you're trying to sign "${currentLetter}", but the sign needs more clarity.`);
        }
        
        // Suggest moving to next letter if mastered
        if (letterMastery[currentLetter] >= 90 && consecutiveCorrect >= 5) {
          setFeedback(prev => `${prev} You've mastered this letter! Try moving to the next one.`);
        }
      } else {
        // Reset consecutive correct count on incorrect detection
        setConsecutiveCorrect(0);
        
        // Provide feedback for incorrect signs
        if (confidence > 0.8) {
          setFeedback(`That's actually a clear "${detected}" sign, not "${currentLetter}". Check the reference image.`);
        } else if (confidence > 0.6) {
          setFeedback(`Your hand position looks more like the letter "${detected}" than "${currentLetter}".`);
        } else {
          setFeedback(`I'm having trouble recognizing your sign. Make sure your hand is clearly visible and try to match the reference position for "${currentLetter}".`);
        }
      }
    }
  };
  
  // Change the current letter to practice
  const changeCurrentLetter = () => {
    // Save progress for current letter
    setLetterProgress(prev => ({
      ...prev,
      [currentLetter]: {
        mastery: letterMastery[currentLetter],
        lastPracticed: new Date().toISOString()
      }
    }));
    
    // Reset tracking variables
    setConsecutiveCorrect(0);
    setAttemptCount(0);
    setFeedback('');
    
    // Determine next letter (either random or sequential)
    let nextLetter;
    
    // Option 1: Sequential progression through the alphabet
    const currentIndex = letterClasses.indexOf(currentLetter);
    nextLetter = letterClasses[(currentIndex + 1) % letterClasses.length];
    
    // Option 2: Smart progression - focus on letters with low mastery
    // Uncomment to use this more advanced approach
    /*
    const lettersByMastery = [...letterClasses].sort((a, b) => letterMastery[a] - letterMastery[b]);
    // 80% chance to pick from the 5 least mastered letters
    if (Math.random() < 0.8) {
      const leastMasteredLetters = lettersByMastery.slice(0, 5);
      nextLetter = leastMasteredLetters[Math.floor(Math.random() * leastMasteredLetters.length)];
    } else {
      // 20% chance to pick any letter
      nextLetter = letterClasses[Math.floor(Math.random() * letterClasses.length)];
    }
    */
    
    setCurrentLetter(nextLetter);
  };
  
  // Reset progress function
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress?')) {
      const resetMastery = {};
      letterClasses.forEach(letter => {
        resetMastery[letter] = 0;
      });
      
      setLetterMastery(resetMastery);
      setLetterProgress({});
      setConsecutiveCorrect(0);
      setAttemptCount(0);
      setFeedback('All progress has been reset.');
      
      // Clear local storage
      localStorage.removeItem('asl-letter-mastery');
      localStorage.removeItem('asl-letter-progress');
    }
  };
  
  // Get specific tips for each letter
  const getLetterTips = (letter) => {
    const tips = {
      'A': "Make a fist with your thumb resting on the side of your hand. Keep your thumb visible.",
      'B': "Hold your hand flat with fingers together and thumb tucked against your palm.",
      'C': "Curve your hand into a 'C' shape with your thumb and fingers slightly apart.",
      'D': "Make an 'O' shape with your thumb and index finger, keeping other fingers straight up.",
      'E': "Curl all fingers inward with your thumb tucked against your palm.",
      'F': "Touch your thumb and index finger together, keeping other fingers extended.",
      'G': "Extend your index finger and thumb in an 'L' shape, but pointing forward.",
      'H': "Extend your index and middle fingers together, with other fingers closed.",
      'I': "Make a fist with just your pinky extended upward.",
      'K': "Extend your index and middle fingers upward in a 'V' shape with your thumb between them.",
      'L': "Make an 'L' shape with your thumb extended to the side and index finger pointing up.",
      'M': "Place your thumb between your ring and pinky fingers with all fingers closed.",
      'N': "Place your thumb between your middle and ring fingers with all fingers closed.",
      'O': "Form a circle with your fingers and thumb, like an 'O' shape.",
      'P': "Point your middle finger down with your index finger and thumb extended in an 'P' shape.",
      'Q': "Point your index finger down with thumb to the side.",
      'R': "Cross your index and middle fingers with both extended.",
      'S': "Make a fist with your thumb over your fingers.",
      'T': "Make a fist with your thumb between your index and middle fingers.",
      'U': "Extend your index and middle fingers together upward.",
      'V': "Extend your index and middle fingers in a 'V' shape.",
      'W': "Extend your index, middle, and ring fingers in a 'W' shape.",
      'X': "Make a fist with your index finger half-bent.",
      'Y': "Extend your thumb and pinky finger with other fingers closed."
    };
    
    return tips[letter] || "No specific tips available for this letter.";
  };
  
  // URLs for reference images (you would need to create these)
  const getLetterReferenceImage = (letter) => {
    // In a real implementation, you would return actual image URLs
    // For now, we'll use placeholders representing each letter
    return `/api/placeholder/150/150?text=${letter}`;
  };
  
  // Get color based on mastery level
  const getMasteryColor = (mastery) => {
    if (mastery < 30) return '#dc3545'; // Red
    if (mastery < 60) return '#ffc107'; // Yellow
    if (mastery < 90) return '#17a2b8'; // Blue
    return '#28a745'; // Green
  };
  
  return (
    <div className="sign-language-detector">
      <h1>Sign Language Alphabet Detector</h1>
      
      <div className="main-container">
        <div className="video-container">
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          <canvas 
            ref={canvasRef}
          />
          
          {/* Hand position guide overlay */}
          <div className="hand-guide">
            <div className="guide-text">
              Position your hand here
            </div>
          </div>
        </div>
        
        <div className="info-panel">
          <div className="current-letter">
            <h2>Current Letter to Sign:</h2>
            <div className="letter-display">{currentLetter}</div>
            
            {/* Reference image */}
            <div className="reference-image">
              <h4>Reference:</h4>
              <img 
                src={getLetterReferenceImage(currentLetter)} 
                alt={`Reference for letter ${currentLetter}`}
                className="sign-reference"
              />
              <button 
                className="tips-button"
                onClick={() => alert(getLetterTips(currentLetter))}
              >
                Tips for "{currentLetter}"
              </button>
            </div>
            
            <button 
              onClick={changeCurrentLetter}
              className="next-button"
            >
              Next Letter
            </button>
          </div>
          
          <div className="detection-results">
            <h3>Detection Results:</h3>
            {detectedSign ? (
              <div>
                <div className="result-header">
                  <div className="detected-letter">
                    <p>Detected Sign:</p> 
                    <div className="letter-badge">{detectedSign}</div>
                  </div>
                  
                  <div className="confidence-meter">
                    <p>Confidence:</p>
                    <div className="meter-container">
                      <div 
                        className="meter-fill" 
                        style={{width: `${parseFloat(confidenceScore) * 100}%`}}
                      ></div>
                      <span className="meter-text">{(parseFloat(confidenceScore) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
                
                <p className={`feedback ${
                  detectedSign === currentLetter && parseFloat(confidenceScore) > 0.7 
                    ? 'success' 
                    : detectedSign === currentLetter 
                      ? 'warning' 
                      : 'error'
                }`}>
                  {feedback}
                </p>
              </div>
            ) : (
              <p>No sign detected yet. Show your hand in the camera.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="practice-history">
        <h3>Practice Progress</h3>
        <div className="letter-grid">
          {letterClasses.map(letter => (
            <div 
              key={letter} 
              className={`letter-cell ${letter === currentLetter ? 'current' : ''}`}
              onClick={() => setCurrentLetter(letter)}
              style={{
                background: letter === currentLetter ? '#4285f4' : 
                  `linear-gradient(to top, #e9ecef ${100 - letterMastery[letter]}%, ${getMasteryColor(letterMastery[letter])} ${100 - letterMastery[letter]}%)`
              }}
            >
              {letter}
              {letterMastery[letter] > 0 && (
                <span className="mastery-indicator">{Math.floor(letterMastery[letter])}%</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="session-stats">
          <p>Current Session:</p>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-value">{attemptCount}</span>
              <span className="stat-label">Attempts</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{consecutiveCorrect}</span>
              <span className="stat-label">Streak</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{Object.values(letterMastery).filter(m => m >= 90).length}</span>
              <span className="stat-label">Mastered</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="instructions">
        <div className="instruction-header">
          <h2>Instructions:</h2>
          <button 
            onClick={resetProgress}
            className="reset-button"
          >
            Reset Progress
          </button>
        </div>
        <ol>
          <li>Position your hand in the center of the camera view</li>
          <li>Make the sign for the displayed letter using the reference image as a guide</li>
          <li>Hold the sign steady for best results</li>
          <li>Ensure good lighting for better detection</li>
          <li>Try to achieve at least 70% confidence for each letter before moving on</li>
        </ol>
        
        <div className="settings-panel">
          <h3>Performance Settings</h3>
          <div className="settings-controls">
            <div className="setting-item">
              <label htmlFor="detection-fps">Detection Speed:</label>
              <select 
                id="detection-fps" 
                onChange={(e) => setDetectionInterval(parseInt(e.target.value))}
                defaultValue="100"
              >
                <option value="33">High (30 FPS)</option>
                <option value="67">Medium (15 FPS)</option>
                <option value="100">Normal (10 FPS)</option>
                <option value="200">Low (5 FPS)</option>
              </select>
            </div>
            
            <div className="setting-item">
              <label htmlFor="detection-confidence">Minimum Confidence:</label>
              <select 
                id="detection-confidence" 
                onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
                defaultValue="0.5"
              >
                <option value="0.7">High (70%)</option>
                <option value="0.5">Medium (50%)</option>
                <option value="0.3">Low (30%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageDetector;