import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer.js'
import Image from 'next/image'
export default function About() {
  return ( <div>

<Header/>
  <main class="about-container">
        <section class="mission-section">
            <h1 class="mission-title">THE MISSION</h1>
            <div class="mission-content">
                <div class="logo-section">
                    <h2 class="sign-heading">Sign</h2>
                    <p class="interactive-text">INTERACTIVE EXPERIENCE</p>
                </div>
                <p class="mission-description">
                    Working to provide an interactive experience for individuals to master the
                    basics of American Sign Language
                </p>
                <p class="detail-text">
                    SignIE is an innovative ASL teaching site that uses an interactive online
                    environment to live grade our users when they practice signing. Through
                    the use of Computer Vision and Machine Learning, we created an online
                    experience where users get a similar quality of live feedback that they
                    would receive in a class, or with a private tutor.
                </p>
                <p class="detail-text">
                    SignIE aims to boost the vocabulary and grammar of users and set a
                    solid foundation for their ASL learning experience. We believe that the
                    standard of technology is accessibility.
                </p>
                <p class="detail-text">
                    Most ASL teaching applications lack this type of interactivity which
                    is an important part of learning any kind of language. Most
                    resources follow the lesson flow to this:
                </p>
                <p class="detail-text">
                    Users watch a video, practice that sign within the digital "mirror",
                    then grade themselves.
                </p>
                <p class="detail-text">
                    With the onus on the user to figure out if they are doing so
                    correctly, not the application, we saw what needed to be done.
                </p>
            </div>
        </section>

     
        <section class="team-section">
            <h2 class="team-heading">Meet the Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <div class="member-avatar"></div>
                    <h3 class="member-name">Leigh Adams</h3>
                    <p class="member-role">Frontend + Backend Developer</p>
                    <p class="member-description">
                        Working on performance optimization and programming, and working on SignIE allowed 
                        them to push their goals in both fields. Education has always been an important 
                        cause, and with the mobility working with Python to achieve their process and 
                        make it easier for people trying to learn.
                    </p>
                    <p class="member-contact">To see more of Leigh's work, visit their portfolio at libera.Studios/portfolio</p>
                </div>

                <div class="team-member">
                    <div class="member-avatar"></div>
                    <h3 class="member-name">Emily Clark</h3>
                    <p class="member-role">Software Architect + Designer</p>
                    <p class="member-description">
                        Software Architect + Designer who is passionate about communication and 
                        accessibility. This project has opened doors to developing new ideas and 
                        focusing on designing the architecture of SignIE into a incredible proof 
                        of our time.
                    </p>
                    <p class="member-contact">To see more of Clark's projects visit repos/EmilyClarkWork.com</p>
                </div>

                <div class="team-member">
                    <div class="member-avatar"></div>
                    <h3 class="member-name">Patsy Paredes</h3>
                    <p class="member-role">Multimedia + UX/UI Designer</p>
                    <p class="member-description">
                        Patsy is a dedicated designer with a passion for education and learning 
                        through innovation. Through storytelling and framing her work, she allowed 
                        her to create an inclusive platform that improves productivity for her clients.
                    </p>
                    <p class="member-contact">repos/StudioParedes.com</p>
                </div>

                <div class="team-member">
                    <div class="member-avatar"></div>
                    <h3 class="member-name">Andres Rodriguez</h3>
                    <p class="member-role">Frontend + Backend Developer</p>
                    <p class="member-description">
                        Andres Rodriguez is a web developer who's passionate about creating 
                        accessible solutions for the hearing impaired and transforming ways 
                        into new ideas and learning. For this project he was excited about 
                        creating equitable solutions for users learning ASL.
                    </p>
                    <p class="member-contact">major/RodriguezAndres.com</p>
                </div>

                <div class="team-member">
                    <div class="member-avatar"></div>
                    <h3 class="member-name">Karen Sanchez Crespo</h3>
                    <p class="member-role">Graphic Designer + UI Designer</p>
                    <p class="member-description">
                        Karen Sanchez who now is a lifelong storyteller - but not through 
                        conventional language - but in creating accessible design stems from 
                        her personal journey of learning ASL, where she recognized a gap in 
                        digital learning experiences.
                    </p>
                    <p class="member-contact">portfolio/karen.com</p>
                </div>
            </div>
        </section>

       
        <section class="process-section">
            <h2 class="process-heading">The Process</h2>
            <div class="process-content">
                <div class="process-images">
                    <img src="images/raspberry-pi.jpg" alt="Raspberry Pi board" class="pi-image"/>
                    <img src="images/hand-gesture.jpg" alt="Hand gesture against blue background" class="hand-image"/>
                </div>
                <div class="process-text-content">
                    <p class="process-text">
                        Recognizing hand signs on a computer takes a lot more than
                        just a camera. We use specialized hardware and open-source 
                        library called Computer Vision to train the computer to recognize 
                        hand signs in sign language.
                    </p>
                    <p class="process-text">
                        This requires a large pool of data to ensure that the
                        computer is as accurate as possible when matching signs.
                        Once we have accomplished this goal, we are able to 
                        ensure that anyone can use the application and get
                        accurate feedback.
                    </p>
                    <p class="process-text">
                        By keeping accessibility and education at the forefront of our
                        process a many aspects of SignIE, allowing different people to 
                        access our platform - that's what SignIE is all about.
                    </p>
                </div>
                </div>
        </section>
    </main>   </div>)}