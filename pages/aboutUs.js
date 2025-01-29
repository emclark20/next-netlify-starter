import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Image from 'next/image'
export default function About() {
  return ( <div>
    <Header/>
  <div class="aboutBody">
   
        <h1>Get to Know Us</h1> 
        <Image src="/assets/primaryLogoBlue.png" width={500} height={155} alt="Logo of SignIE" /> 
                <h3> Working to provide an interactive experience for individuals to master the basics of American Sign Language
                </h3> 
                    <p> SignIE is an innovative ASL teaching site that uses an interactive online environment to grade our users when they practice signing. Through the use of Computer Vision and Machine Learning, we created an online experience where users get a similar quality of live feedback that they would receive in a class, or with a private tutor. 
                    </p>
                    <p> SignIE aims to boost users' vocabulary and grammar and set a solid foundation for their ASL learning experience. We believe that the standard of technology is accessibility.</p>
                    <p>Most ASL teaching applications lack this type of interactivity which is an important part of learning any kind of language. Most resources follow a similar flow to this: Users watch a video, practice that sign within the digital “mirror”, Users grade themselves. </p>
                    <p>With the focus on the user to figure out if they are doing so correctly, not the application, we saw what needed to be done.</p>

        {/*This are the divs for the graphical elements that we designed on the figma*/}
        <div class="triangle-decorator triangle-top"></div>
        <Image src="/assets/webcamAngledLookingLeft.png" width={400} height={470} alt="Webcam looking left" /> 
        <div class="triangle-decorator triangle-middle"></div>
    
            <h2>Meet the Team</h2>
        {/*There has to be a team grid becuase of the positioning of stuff*/}
            <div class="team-grid">
                <div class="team-member">
                    <Image src="/assets/avatar.png" width={100} height={100} alt="placeholder for team member headshot" />
                        <h3>Leigh Adams</h3>
                            <p>Leigh takes great joy in both design and programming and working on SignIE allowed them to push their skills to the limit. Education and the facilitation of it has always been of interest to Leigh, as well as finding new ways to advance that process and make it easier for anyone trying to learn. Through working with the SignIE team, this dream was brought to life.
                            </p>
                            <p>To see more of Leigh's work, visit their portfolio at: https://jericho-smericho.github.io/AdamsPortfolio/ 
                            </p>
                </div>
                <div class="team-member">
                    <Image src="/assets/avatar.png" width={100} height={100} alt="placeholder for team member headshot" />
                        <h3>Emily Clark</h3>
                            <p>Emily Clark is a web developer who is passionate about communication and accessibility. This project has married both of these passions and has been a joy to work on. Clark worked intimately on designing the architecture of SignIE and is incredibly proud of our final product.</p>
                            <p> To see more of Clark's projects see  myportfoliodoesntexist.com</p>
                </div>

                <div class="team-member">
                   <Image src="/assets/avatar.png" width={100} height={100} alt="placeholder for team member headshot" />
                        <h3>Patsy Paredes</h3>
                            <p>Patsy is a dedicated designer with a passion for accessibility and fostering community through thoughtful design. Working on SignIE has allowed her to combine her skills and experiences to create an inclusive platform that empowers users to learn and connect. For Patsy, contributing to a tool that promotes understanding and accessibility has been an incredibly rewarding experience.</p>
                            <p> To see more of Patsy's project see myportfoliodoesntexist.com</p>
                </div>
                <div class="team-member">
                    <Image src="/assets/avatar.png" width={100} height={100} alt="placeholder for team member headshot" />
                        <h3>Andres Rodriguez</h3>
                            <p> Andres Rodriguez is a web developer who is passionate about creating solutions for the hearing impaired and translating audio into more than just closed captions. Andres is passionate about creating equitable solutions for all. His love for development stems from his love for design and building. Andres is excited about creating solutions for the hearing impaired with SignIE as a developer. </p>
                            <p>To see more of Andres'; projects see  myportfoliodoesntexist.com
                            </p>
                </div>
                <div class="team-member">
                    <Image src="/assets/avatar.png" width={100} height={100} alt="placeholder for team member headshot" />
                        <h3>Karen Sanchez Crespo</h3>
                            <p> Karen Sanchez at her core is a strong designer and communicator. Fluent in 3 languages - not including programming languages! Her passion for SignIE stems from her journey of learning ASL, where she recognized a lack of interactive tools to support her studies. This experience inspired her dedication to the project and its mission to transform ASL education.
                            </p>
                            <p>To see more of Karen's work, visit her portfolio at: portfolionothere.com.
                            </p>
                </div>
            </div>
                    <h2>The Process</h2>
                        <Image src="/assets/raspberryPi.png" width={500} height={155} alt="Raspberry Pi mini computer" /> 
                            <p> Recognizing hand signs on a computer takes a lot more than just matching pictures together, especially when the computer has to match the hand sign in live video. To accomplish this, we use a combination of machine learning and an open-source library called Computer Vision. By using a lot of math and data points, we can find patterns in single frames of video of where most people&apos;s hands land when making specific signs. 
                            </p>
                            <p>This requires a large pool of data to ensure that the computer is as accurate as possible when matching signs. By using many different subjects as this data pool, we can ensure that anyone can use this application and get accurate results. That way, no matter where you place your hands or how dark the room is, You will be able to receive accurate and real-time responses on your signs!
                            </p>
                            <p>By keeping accessibility and education at the forefront, we can ensure that these values are present in every aspect of SignIE allowing anyone and everyone to learn ASL. Because that&apos;s what SignIE is all about.
                            </p>
                        
                        <Image src="/assets/handsRealsitic.png" width={500} height={155} alt="Three hands showing their palms to the audience" /> 
                        <div class="pentagon">
                            
                        </div>
  </div>
  <Footer/>
  </div>
  )}