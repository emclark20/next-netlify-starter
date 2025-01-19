import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer.js'
export default function Home() {
  return (
    <div>
<Header/>
    <section class="hero">
        <div class="hero-content">
            <h1>Introducing<br/>SignIE</h1>
            <p>Your Gateway to an Engaging ASL Learning<br/>
            Learn ASL at your own pace with our intuitive platform. Simply sign up, start practicing, and receive instant feedback on your performance.</p>
            <a href="#" class="start-btn">Start Using SignIE</a>
        </div>
        <img src="/api/placeholder/400/400" alt="Webcam Icon" class="webcam-icon"/>
    </section>

    <section class="explore-section">
        <h2 class="explore-title">LET'S<br/><span>EXPLORE</span><br/>SIGN<br/>LANGUAGE</h2>
        <p>American Sign Language is a complete language. Over 11 million Americans use sign language in their day to day life. We spent time with ASL experts and the Deaf community before developing this product. Our software is built to help you practice the hand gestures in real time and receive instant feedback on whether you are performing the gestures correctly. We have linked resources within the ASL community that helped us learn. Combining these outside resources with our software you will be communicating in no time!</p>
        
        <div class="resources">
            <div class="resource-item">
                <img src="/api/placeholder/50/50" alt="ASLTeachingResources.com"/>
                <h3>ASLTeachingResources.com</h3>
            </div>
            <div class="resource-item">
                <img src="/api/placeholder/50/50" alt="LifePrint.com"/>
                <h3>LifePrint.com</h3>
            </div>
            <div class="resource-item">
                <img src="/api/placeholder/50/50" alt="Statewide Outreach"/>
                <h3>Statewide Outreach Center Videos</h3>
            </div>
            <div class="resource-item">
                <img src="/api/placeholder/50/50" alt="NAD.org"/>
                <h3>NAD.org</h3>
            </div>
        </div>
    </section>

    <section class="new-way">
        <div class="new-way-content">
            <h2>A New Way To Learn</h2>
            <p>Our mission is to empower individuals to learn and communicate in American Sign Language through innovative technology. We strive to provide an accessible, effective, and engaging platform that fosters language acquisition, cultural understanding, and inclusion. By combining cutting-edge computer vision with personalized instruction, we aim to bridge the communication gap and create a more equitable world for ASL learners and users.</p>
        </div>
        <img src="/api/placeholder/400/400" alt="SignIE Logo Large"/>
    </section>

    <section class="team-section">
        <h2>Meet The Team</h2>
        <p>Our team at SignIE is committed to fostering a collaborative and inclusive environment where everyone feels valued and empowered. We prioritize open communication, respect for diverse perspectives, and a shared dedication to excellence. Our team values are the foundation upon which we build strong relationships, achieve our goals, and make a positive impact.</p>
        <div class="team-avatars">
            <div class="avatar"></div>
            <div class="avatar"></div>
            <div class="avatar"></div>
            <div class="avatar"></div>
            <div class="avatar"></div>
        </div>
        <a href="#" class="start-btn">About Us</a>
    </section>
    <Footer/>    </div>
    
  )
}

