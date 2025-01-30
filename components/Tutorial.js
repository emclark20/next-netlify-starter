import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Tutorial.module.css';

const TutorialModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show modal when component mounts
    setIsOpen(true);
  }, []);

  const tutorialSteps = [
    {
      title: "Welcome!",
      content: "Let's walk you through the main features of our application."
    },
    {
      title: "Content Overview",
      content: "This is your main dashboard where you can see all the content available to you at a glance."
    },
    {
      title: "Navigation",
      content: "Use the buttons to quickly navigate between different ASL tutorials."
    },
    {
      title: "Practicing",
      content: "Once you click on a flashcard to get started, you will be brought to a page with a video tutorial. Then you will recreate the sign in the camera!"
    },
    {
      title: "Get Started",
      content: "You're all set! Start exploring & get signing!"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button 
          onClick={handleClose}
          className={styles.closeButton}
        >
          <X size={20} />
        </button>

        <div className={styles.progressContainer}>
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressBar} ${
                index <= currentStep ? styles.progressActive : ''
              }`}
            />
          ))}
        </div>

        <div className={styles.contentContainer}>
          <h2 className={styles.title}>
            {tutorialSteps[currentStep].title}
          </h2>
          <p className={styles.description}>
            {tutorialSteps[currentStep].content}
          </p>
        </div>

        <button
          onClick={handleNext}
          className={styles.nextButton}
        >
          {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;