import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    setIsPressed(true);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
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

  if (!isPressed) return null;

  return (
    <div className="chatPanel">
      <div className="chatContent">
        <div>
          <h2>Technical Support</h2>
          <button onClick={closeChat}>
            <X size={20} />
          </button>
        </div>
        {!selectedIssue && !showForm && (
          <div>
            <p>Please Select Your Issue: </p>
            {techOptions((option) =>(
                <button key={option.index} onClick={() => handleSubmit(option)}>{option.issue}</button>
            ))}
            
          </div>
        )}
        {selectedIssue && !showForm &&(
            <div>
                <div>
                    <h3>{selectedIssue.issue}</h3>
                    <p>{selectedIssue.solution}</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
