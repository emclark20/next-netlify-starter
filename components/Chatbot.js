import React, { useState, useEffect } from "react";
import styles from "./Chatbot.module.css";
import Image from "next/image";

import { X } from "lucide-react";

//function to open chat panel when button pressed
//function to present options for technical issues
//function to present solution to whichever option pressed
//not resolved? space to send complaint

const ChatBot = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [customIssue, setCustomIssue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const openChat = () => {
    setIsPressed(true);
  };

  const closeChat = () => {
    setIsPressed(false);
    setSelectedIssue(null);
    setShowForm(false);
  };

  const techOptions = [
    {
      issue: "Camera won't load",
      solution:
        "Go to browser settings and allow SignIE permission to use the camera.",
      index: 1,
    },
    {
      issue: "SignIE can't recognize what sign I'm making",
      solution:
        "Make sure you're in a well lit area, your hands are visible in the camera, then do the sign again but slower.",
      index: 2,
    },
    {
      issue: "Video won't load",
      solution:
        "Check your internet connection and refresh the page. If the problem persists, try clearing your browser cache.",
      index: 3,
    },
    { issue: "Other...", Solution: "", index: 4 },
  ];

  const chooseOpt = (option) => {
    setSelectedIssue(option);
    if (option.index === 4) {
      setShowForm(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("custom issue submitted: ", customIssue);
    setCustomIssue("");
    setShowForm(false);
    setSelectedIssue({
      issue: "Custom Issue",
      solution:
        "Thank you for reporting this issue. Our team will look into it and get back to you soon.",
      index: 5,
    });
  };

  return (
    <>
      {/* Chat trigger image */}
      {!isPressed && (
        <Image
          src="/assets/techIcon.png"
          width={120}
          height={120}
          alt="Chat Support"
          className={`${styles.chatTrigger} cursor-pointer`}
          onClick={openChat}
        />
      )}

      {/* Chat panel */}
      {isPressed && (
        <div className={styles.chatPanel}>
          <div className={styles.chatContent}>
            <div>
              <h2>Technical Support</h2>
              <button className={styles.headerArea} onClick={closeChat}>
                <X size={20} />
              </button>
            </div>
            {!selectedIssue && !showForm && (
              <div>
                <p>Please Select Your Issue: </p>
                {techOptions.map((option) => (
                  <button
                    className={styles.issueButton}
                    key={option.index}
                    onClick={() => chooseOpt(option)}
                  >
                    {option.issue}
                  </button>
                ))}
              </div>
            )}
            {selectedIssue && !showForm && (
              <div className={styles.solutionContainer}>
                <div>
                  <h3>{selectedIssue.issue}</h3>
                  <p>{selectedIssue.solution}</p>
                </div>
                <div>
                  <p>Did This Help?</p>
                </div>
                <div className={styles.responseButtons}>
                  <button className={styles.yesButton} onClick={closeChat}>
                    Yes!
                  </button>
                  <button
                    className={styles.noButton}
                    onClick={() => setShowForm(true)}
                  >
                    No, I need more help
                  </button>
                </div>
              </div>
            )}
            {showForm && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>What's Going On?</label>
                  <textarea
                    value={customIssue}
                    onChange={(event) => setCustomIssue(event.target.value)}
                    placeholder="Please describe your issue..."
                    required
                  />
                </div>
                <div>
                  <button className={styles.submitButton} type="submit">
                    Submit
                  </button>
                  <button
                    className={styles.submitButton}
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedIssue(null);
                    }}
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ChatBot;
