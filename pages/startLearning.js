import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Flashcard from "@components/Flashcard";
import TutorialModal from "@components/Tutorial";
import Camera from "@components/Camera";
import styles from "./practice.module.css";
import AlphabetCarousel from "@components/AlphabetCarousel";
import PhraseCarousel from "@components/PhrasesCarousel";
import ChatBot from "@components/Chatbot";
export default function startLearning() {
  return (
    <div>
      <Header />
      <AlphabetCarousel />
      <PhraseCarousel />
      <ChatBot />
      <Footer />
    </div>
  );
}
