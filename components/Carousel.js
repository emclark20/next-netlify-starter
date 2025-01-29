import React, { useState } from "react";

const CardSlider = () => {
  const abArray = [
    { category: "alphabet", text: "A", index: 1 },
    { category: "alphabet", text: "B", index: 2 },
    { category: "alphabet", text: "C", index: 3 },
    { category: "alphabet", text: "D", index: 4 },
    { category: "alphabet", text: "E", index: 5 },
    { category: "alphabet", text: "F", index: 6 },
    { category: "alphabet", text: "G", index: 7 },
    { category: "alphabet", text: "H", index: 8 },
    { category: "alphabet", text: "I", index: 9 },
    { category: "alphabet", text: "J", index: 10 },
    { category: "alphabet", text: "K", index: 11 },
    { category: "alphabet", text: "L", index: 12 },
    { category: "alphabet", text: "M", index: 13 },
    { category: "alphabet", text: "N", index: 14 },
    { category: "alphabet", text: "O", index: 15 },
    { category: "alphabet", text: "P", index: 16 },
    { category: "alphabet", text: "Q", index: 17 },
    { category: "alphabet", text: "R", index: 18 },
    { category: "alphabet", text: "S", index: 19 },
    { category: "alphabet", text: "T", index: 20 },
    { category: "alphabet", text: "U", index: 21 },
    { category: "alphabet", text: "V", index: 22 },
    { category: "alphabet", text: "W", index: 23 },
    { category: "alphabet", text: "X", index: 24 },
    { category: "alphabet", text: "Y", index: 25 },
    { category: "alphabet", text: "Z", index: 26 },
  ];
  const cwArray = [
    { category: "Common Words", text: "hello", index: 1 },
    { category: "Common Words", text: "Good Bye", index: 2 },
    { category: "Common Words", text: "Mother", index: 3 },
    { category: "Common Words", text: "Father", index: 4 },
    { category: "Common Words", text: "Sister", index: 5 },
    { category: "Common Words", text: "Brother", index: 6 },
  ];
  const bmArray = [
    { category: "Common Words", text: "Mother", index: 1 },
    { category: "Common Words", text: "Good Bye", index: 2 },
    { category: "alphabet", text: "Y", index: 3 },
    { category: "Common Words", text: "Sister", index: 4 },
    { category: "alphabet", text: "J", index: 5 },
    { category: "alphabet", text: "E", index: 6 },
  ];
  const [cardIndexes, setCardIndexes] = useState({
    alphabet: 0,
    commonWords: 0,
    bookmarks: 0,
  });

  const CARDS_TO_SHOW = 3;

  const Cardset = ({ cards, currentIndex, className, onPrev, onNext }) => {
    const visibleCards = [];
    for (let i = 0; i < CARDS_TO_SHOW; i++) {
      const cardIndex = (currentIndex + i) % cards.length;
      visibleCards.push(cards[cardIndex]);
    }
    return (
      <div>
        <div class="row">
          <button onClick={onPrev}>&#10094;</button>
          {visibleCards.map((cards) => (
            <div class="slide" key={cards.index}>
              <h2>{cards.category}</h2>
              <h3>{cards.text}</h3>
            </div>
          ))}

          <button onClick={onNext}>&#10095;</button>
        </div>
      </div>
    );
  };

  const buttonNav = (section, step) => {
    setCardIndexes((prev) => ({
      ...prev,
      [section]:
        (prev[section] + step + (step < 0 ? CARDS_TO_SHOW : 0)) %
        (section === "alphabet"
          ? abArray.length
          : section === "commonWords"
          ? cwArray.length
          : bmArray.length),
    }));
  };
  return (
    <div>
      <div class="row">
        <div class="slideHolder" id="alphab">
          <h1>Alphabet</h1>
          <Cardset
            cards={abArray}
            currentIndex={cardIndexes.alphabet}
            class="slide"
            onNext={() => buttonNav("alphabet", CARDS_TO_SHOW)}
            onPrev={() => buttonNav("alphabet", CARDS_TO_SHOW)}
          />
        </div>
      </div>

      <div class="row">
        <div class="slideHolder" id="commmonW">
          <h1>Common Words</h1>
          <Cardset
            cards={cwArray}
            currentIndex={cardIndexes.commonWords}
            class="slide"
            onNext={() => buttonNav("commonWords", CARDS_TO_SHOW)}
            onPrev={() => buttonNav("commonWords", CARDS_TO_SHOW)}
          />
        </div>
      </div>

      <div class="row">
        <div class="slideHolder" id="bookM">
          <h1>Common Words</h1>
          <Cardset
            cards={bmArray}
            currentIndex={cardIndexes.bookmarks}
            class="slide"
            onNext={() => buttonNav("bookmarks", CARDS_TO_SHOW)}
            onPrev={() => buttonNav("bookmarks", CARDS_TO_SHOW)}
          />
        </div>
      </div>
    </div>
  );
};
export default CardSlider;
