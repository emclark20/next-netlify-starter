import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import CardSlider from "@components/Carousel";

export default function Catalogue() {
  return (
    <div>
      <Header />
      <div class="container">
        <div class="libraries">
            <CardSlider />
          </div>
        
        <div class="camera-view"></div>
      </div>
      <Footer />
    </div>
  );
}
