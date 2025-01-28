import Head from "next/head"
import Header from "@components/Header"
import Footer from "@components/Footer"

export default function StartLearning() {
    return (<div>
        <Header />
        <div class="container">
            {/* <!--PLACEHOLDER VIDEO--> */}
            <div class="video">
                <video width="90%" controls>
                    <source src="Z ASL.mp4" type="video/mp4" />
                    <source src="placeholder.PNG" />
                    Your Browser Does Not Support this Video
                </video>
            </div>
            <div class="cataloug">
                <div class="libraries">
                    <div class="lib">
                        <button id="prev">&#10094;</button>
                        <div id="selected"></div>
                        <button id="next">&#10095;</button>
                    </div>
                </div>
            </div>
            <div class="camera-view"></div>
        </div>
        <Footer />
    </div>

    )
}