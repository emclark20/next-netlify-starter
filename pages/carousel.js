//THIS PRACTICE A IS LEIGHS WORKING CARASOUL I THINK. WE ARE KEEPING IT AND IT WILL HAVE PURPOSE IN THE FUTURE


import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
export default function learningA() {
  return (
    <div>
      <Header />
      <div class="learningContainer">
        <div class="video"></div>
        <div class="catalogueA">
          <h2>Alphabet Library</h2>
          <div class="library">
            <div class="row">
              <button id="prev">&#10094;</button>
              <div class="slideHolder" id="alphaB"></div>
              <button id="next">&#10095;</button>
            </div>
          </div>
        </div>
        <div class="cv-view"></div>
      </div>
      <Footer />
    </div>
  );
}