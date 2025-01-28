import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Catalogue() {
  return (
    <div>
      <Header />
      <div class="container">
        <div class="libraries">
          <div class="row">
            <button id="prev">&#10094;</button>
            <div class="slideHolder" id="alphaB"></div>
            <button id="next">&#10095;</button>
          </div>
          <div class="row">
            <button id="prev">&#10094;</button>
            <div class="slideHolder"  id="commonW"></div>
            <button id="next">&#10095;</button>
          </div>
          <div class="row">
            <button id="prev">&#10094;</button>
            <div class="slideHolder"  id="bookM"></div>
            <button id="next">&#10095;</button>
          </div>
        </div>
        <div class="camera-view"></div>
      </div>
      <Footer />
    </div>
  );
}
