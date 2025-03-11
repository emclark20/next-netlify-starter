import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import Image from 'next/image'
export default function Home() {
  return (
    <div>
<Header/>
    <section class="hero">
        <div class="hero-content">
            <h1>Introducing<br/>SignIE</h1>
            <p>Your Gateway to an Engaging ASL Learning<br/>
            Learn ASL at your own pace with our intuitive platform. Simply sign up, start practicing, and receive instant feedback on your performance.</p>
            <Link href="flashcards" class="start-btn">Start Using SignIE</Link>
        </div>
        <div class="indexPentagon"></div>
        <Image src="/assets/webcam.svg" width={400} height={470} alt="Webcam" />
    </section>

    <section class="explore-section">
        <h2 class="explore-title">LET'S<br/><span>EXPLORE</span><br/>SIGN<br/>LANGUAGE</h2>
        <p>American Sign Language is a complete language. Over 11 million Americans use sign language in their day to day life. We spent time with ASL experts and the Deaf community before developing this product. Our software is built to help you practice the hand gestures in real time and receive instant feedback on whether you are performing the gestures correctly. We have linked resources within the ASL community that helped us learn. Combining these outside resources with our software you will be communicating in no time!</p>
        
        <div class="resources">
            <div class="resource-item">
                <Image src="/assets/signA.svg" width={50} height={51} alt="Hand sign of letter A" />
                <h3>ASLTeachingResources.com</h3>
                <p>Specializes in providing teachers with the necessary tools to be successful. Their mission is to provide ready-to-use sign language-based worksheets, flashcards, videos, and much more to make it easier to teach and communicate with deaf, hearing, and special needs students. All of our content is created by both hearing, hard-of-hearing, and Deaf.</p>
            </div>
            <div class="resource-item">
                <Image src="/assets/signB.svg" width={39} height={56} alt="Hand sign of letter B" />
                <h3>LifePrint.com</h3>
                <p>LifePrint is also known as ASLU, or the University of American Sign Language. ASLU has been offering online sign language instruction since 1997. The program began as an effort to support parents of Deaf children living in rural or "outlying" areas without access to sign language classes.</p>
            </div>
            <div class="resource-item">
                <Image src="/assets/signC.svg" width={51} height={53} alt="Hand sign of letter C" />
                <h3>Statewide Outreach Center Videos</h3>
                <p>Developed by the Texas School for the Deaf. Storytelling shows how different the visual modality for language can be. Note that even when not telling a children's story, ASL signers typically will manually illustrate scenes, role shift (take on the roles of different people in a situation, indicated by body shifting, gaze shifting, and so on.) and make heavy use of classifiers.</p>
            </div>
            <div class="resource-item">
                <Image src="/assets/signD.svg" width={51} height={55} alt="Hand sign of letter D" />
                <h3>NAD.org</h3>
                <p>The National Association of the Deaf (NAD) is the nation’s premier civil rights organization of, by and for deaf and hard of hearing individuals in the United States of America. Established in 1880, the NAD was shaped by deaf leaders who believed in the right of the American deaf community to use sign language, to congregate on issues important to them, and to have its interests represented at the national level.</p>
            </div>
        </div>
    </section>

    <section class="new-way">
        <div class="new-way-content">
            <h2>A New Way To Learn</h2>
            <p>Our mission is to empower individuals to learn and communicate in American Sign Language through innovative technology. We strive to provide an accessible, effective, and engaging platform that fosters language acquisition, cultural understanding, and inclusion. By combining cutting-edge computer vision with personalized instruction, we aim to bridge the communication gap and create a more equitable world for ASL learners and users.</p>
        </div>  
        <Image src="/assets/primaryLogoBlack.svg" width={500} height={155} alt="Logo of SignIE" /> 
        <div class="indexTriangleBotton"></div>
    </section>
       <Image src="/assets/webcamAngled.svg" width={300} height={370} alt="Webcam looking to the left" />  
    <section class="team-section">
        <h2>Meet The Team</h2>
        <p>Our team at SignIE is committed to fostering a collaborative and inclusive environment where everyone feels valued and empowered. We prioritize open communication, respect for diverse perspectives, and a shared dedication to excellence. Our team values are the foundation upon which we build strong relationships, achieve our goals, and make a positive impact.</p>
        <div class="team-avatars">
            <div class="avatar">
            <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" />
            </div>
            <div class="avatar">
            <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" />
            </div>
            <div class="avatar">
            <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" />
            </div>
            <div class="avatar">
            <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" />
            </div>
            <div class="avatar">
            <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" />
            </div>
        </div>
        <Link href="/aboutUs5" class="start-btn">About Us</Link>
    </section>
    <Footer/>    </div>
    
  )
}

