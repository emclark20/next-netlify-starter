import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./Flashcard.module.css";
import ChatBot from "./Chatbot";

const Flashcard = ({
  title,
  letter,
  href,
  id,
  isBookmarked: initialIsBookmarked = false,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/user/profile");
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  // Update bookmark state if prop changes
  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  // Toggle bookmark in database
  const toggleBookmark = async (e) => {
    e.preventDefault(); // Prevent the link navigation
    e.stopPropagation(); // Prevent event bubbling

    if (!id) {
      console.error("Cannot bookmark: No flashcard ID provided");
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await fetch(`/api/bookmarks?flashcardId=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIsBookmarked(false);
        } else {
          console.error("Failed to remove bookmark");
        }
      } else {
        // Add bookmark
        const response = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flashcardId: id }),
        });

        if (response.ok) {
          setIsBookmarked(true);
        } else {
          console.error("Failed to add bookmark");
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close the login alert
  const closeLoginAlert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLoginAlert(false);
  };

  return (
    <div className={styles.flashcardContainer}>
      <Link href={href} className={styles.link}>
        <div className={styles.flashcard}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.content}>
            <span className={`${styles.letter} ${styles.fixedSize}`}>
              {letter}
            </span>
          </div>
        </div>
      </Link>

      {id && (
        <button
          className={`${styles.bookmarkButton} ${
            isBookmarked ? styles.bookmarked : ""
          }`}
          onClick={toggleBookmark}
          disabled={isLoading}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Login Alert Modal */}
      {showLoginAlert && (
        <div className={styles.loginAlertOverlay} onClick={closeLoginAlert}>
          <div
            className={styles.loginAlert}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeLoginAlert}>
              ×
            </button>
            <h3>Sign in Required</h3>
            <p>
              You need to sign in or create an account to bookmark flashcards.
            </p>
            <div className={styles.alertButtons}>
              <Link href="/signUp" className={styles.signUpButton}>
                Sign Up / Sign In
              </Link>
              <button className={styles.cancelButton} onClick={closeLoginAlert}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ChatBot />
    </div>
  );
};

export default Flashcard;
