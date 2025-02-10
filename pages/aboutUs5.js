import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer.js'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className="about-container">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="content-wrapper">
          <h1>THE MISSION</h1>
          <div className="logo-container">
            <Image 
              src="/assets/primaryLogoBlue.svg" 
              width={500} 
              height={155} 
              alt="SignIE Logo" 
              priority
              className="logo"
            />
          </div>
          <h2 className="mission-statement">
            Working to provide an interactive experience for individuals to master the basics of American Sign Language
          </h2>
          <Image 
            src="/assets/webcamAngledLookingLeft.svg" 
            width={400} 
            height={470} 
            alt="Webcam looking left" 
            className="firstImageAboutUs"
          />
          <div className="intro-text">
            <p>SignIE is an innovative ASL teaching site that uses an interactive online environment to grade our users when they practice signing. Through the use of Computer Vision and Machine Learning, we created an online experience where users get a similar quality of live feedback that they would receive in a class, or with a private tutor.</p>
            <p>SignIE aims to boost users' vocabulary and grammar and set a solid foundation for their ASL learning experience. We believe that the standard of technology is accessibility.</p>
            <p>Most ASL teaching applications lack this type of interactivity which is an important part of learning any kind of language. Most resources follow a similar flow to this: Users watch a video, practice that sign within the digital "mirror", Users grade themselves.</p>
            <p>With the focus on the user to figure out if they are doing so correctly, not the application, we saw what needed to be done.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="content-wrapper">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <Image src="/assets/avatar.png" width={100} height={100} alt="placeholder for team member headshot" className="team-image"/>
              <div className="team-info">
                <h3>Leigh Adams</h3>
                <p className="bio">Leigh takes great joy in both design and programming and working on SignIE allowed them to push their skills to the limit. Education and the facilitation of it has always been of interest to Leigh, as well as finding new ways to advance that process and make it easier for anyone trying to learn. Through working with the SignIE team, this dream was brought to life.</p>
                <p>To see more of Leigh's work, visit their portfolio at: https://jericho-smericho.github.io/AdamsPortfolio/</p>
              </div>
            </div>

            <div className="team-card">
              <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" className="team-image"/>
              <div className="team-info">
                <h3>Emily Clark</h3>
                <p className="bio">Emily Clark is a web developer who is passionate about communication and accessibility. This project has married both of these passions and has been a joy to work on. Clark worked intimately on designing the architecture of SignIE and is incredibly proud of our final product.</p>
                <p>To see more of Clark's projects see myportfoliodoesntexist.com</p>
              </div>
            </div>

            <div className="team-card">
              <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" className="team-image"/>
              <div className="team-info">
                <h3>Patsy Paredes</h3>
                <p className="bio">Patsy is a dedicated designer with a passion for accessibility and fostering community through thoughtful design. Working on SignIE has allowed her to combine her skills and experiences to create an inclusive platform that empowers users to learn and connect. For Patsy, contributing to a tool that promotes understanding and accessibility has been an incredibly rewarding experience.</p>
                <p>To see more of Patsy's project see myportfoliodoesntexist.com</p>
              </div>
            </div>

            <div className="team-card">
              <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" className="team-image"/>
              <div className="team-info">
                <h3>Andres Rodriguez</h3>
                <p className="bio">Andres Rodriguez is a web developer who is passionate about creating solutions for the hearing impaired and translating audio into more than just closed captions. Andres is passionate about creating equitable solutions for all. His love for development stems from his love for design and building. Andres is excited about creating solutions for the hearing impaired with SignIE as a developer.</p>
                <p>To see more of Andres' projects see myportfoliodoesntexist.com</p>
              </div>
            </div>

            <div className="team-card">
              <Image src="/assets/avatar.svg" width={100} height={100} alt="placeholder for team member headshot" className="team-image"/>
              <div className="team-info">
                <h3>Karen Sanchez Crespo</h3>
                <p className="bio">Karen Sanchez at her core is a strong designer and communicator. Fluent in 3 languages - not including programming languages! Her passion for SignIE stems from her journey of learning ASL, where she recognized a lack of interactive tools to support her studies. This experience inspired her dedication to the project and its mission to transform ASL education.</p>
                <p>To see more of Karen's work, visit her portfolio at: portfolionothere.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="content-wrapper">
          <h2>The Process</h2>
          <div className="process-grid">
            <div className="process-image">
              <Image 
                src="/assets/raspberryPi.png" 
                width={500} 
                height={155} 
                alt="Raspberry Pi mini computer"
                className="tech-image" 
              />
            </div>
            <div className="process-content">
              <p>Recognizing hand signs on a computer takes a lot more than just matching pictures together, especially when the computer has to match the hand sign in live video. To accomplish this, we use a combination of machine learning and an open-source library called Computer Vision. By using a lot of math and data points, we can find patterns in single frames of video of where most people's hands land when making specific signs.</p>
              <p>This requires a large pool of data to ensure that the computer is as accurate as possible when matching signs. By using many different subjects as this data pool, we can ensure that anyone can use this application and get accurate results. That way, no matter where you place your hands or how dark the room is, You will be able to receive accurate and real-time responses on your signs!</p>
              <p>By keeping accessibility and education at the forefront, we can ensure that these values are present in every aspect of SignIE allowing anyone and everyone to learn ASL. Because that's what SignIE is all about.</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .about-container {
          width: 100%;
          min-height: 100vh;
          background-color: #ffffff;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .hero {
          width: 100vw;
          background: linear-gradient(135deg, #ffffff 0%, #E6F3FF 100%);
          padding: 4rem 0;
          position: relative;
          overflow: hidden;
          min-height: 800px;
        }

        .hero::after {
          content: '';
          position: absolute;
          top: 0;
          right: -20%;
          width: 60%;
          height: 100%;
          background-color: #5CBEE9;
          transform: skewX(-15deg);
          z-index: 1;
        }

        .hero .content-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        .firstImageAboutUs {
          position: absolute !important;
          right: -100px;  /* Increased negative value to move further right */
          top: 20%;
          z-index: 2;
        }

        h1 {
          font-size: 3rem;
          color: #1a237e;
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .logo-container {
          margin: 2rem 0;
          width: 100%;
          max-width: 500px;
        }

        .mission-statement {
          font-size: 1.5rem;
          color: #333;
          max-width: 800px;
          margin: 2rem 0;
          line-height: 1.4;
        }

        .intro-text {
          max-width: 45%;
          position: relative;
          z-index: 3;
        }

        .intro-text p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
          color: #424242;
          font-family: var(--font-nunito)
        }

        /* Team Section */
        .team {
          width: 100vw;
          padding: 6rem 0;
          background-color: #ffffff;
        }

        .team h2 {
          font-size: 2.5rem;
          color: #1a237e;
          margin-bottom: 3rem;
          text-align: center;
          font-family: var(--font-nunito)
        }

        .team-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          width: 100%;
          justify-content: center;
        }

        .team-card {
          flex: 0 1 calc(33.333% - 2rem);
          min-width: 300px;
        }

        /* First row - 3 cards */
        .team-card:nth-child(-n+3) {
          flex: 0 1 calc(33.333% - 2rem);
        }

        /* Last row container */
        .team-grid::after {
          content: "";
          flex: 0 1 calc(33.333% - 2rem);
        }

        @media (max-width: 1200px) {
          .team-card {
            flex: 0 1 calc(50% - 2rem);
          }
        }

        @media (max-width: 768px) {
          .team-card {
            flex: 0 1 100%;
          }
        }

        .team-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-5px);
        }

        .team-image {
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .team-info h3 {
          color: #1a237e;
          margin: 1rem 0;
        }

        .team-info p {
          color: #424242;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        /* Process Section */
        .process {
          width: 100vw;
          padding: 6rem 0;
          background-color: #E6F3FF;
        }

        .process h2 {
          font-size: 2.5rem;
          color: #1a237e;
          margin-bottom: 3rem;
          text-align: center;
        }

        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .tech-image, .hands-image {
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          height: auto;
        }

        .process-content p {
          color: #424242;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .intro-text {
            max-width: 100%;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .hero::after {
            width: 100%;
            right: -50%;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .mission-statement {
            font-size: 1.25rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .content-wrapper {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AboutPage