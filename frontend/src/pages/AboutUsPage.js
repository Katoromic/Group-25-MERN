import React from 'react';

import '../styles/AboutUs.css'
import BackgroundVideo from '../images/background.mp4'
import NavBar from '../components/NavBar';

const AboutUsPage = () => {
    return (
      
        <div id='AboutUsPage' className='overflow-auto'>

            <video autoPlay muted loop className='BackgroundVideo'>
                <source src={BackgroundVideo} type='video/mp4' />
            </video>

            <div className='container'>

                <div className='row'>
                    <div className='col d-flex align-items-center justify-content-center'>
                        <NavBar />
                    </div>
                </div>
                <div className='title'>
                    <h1>About Us</h1>
                    <div className='intro'>

                       <p> WE OFFER A PLATFORM FOR STUDENTS TO LEARN CODING BASICS IN A SUPPORTIVE
                        SETTING WITH SIMPLE, INTERACTIVE, AND BEGINNER-FRIENDLY LESSONS.</p>
                    </div>
                </div>
                <div className='aboutUsBody'>
                    <div>
                        <div id="circleImage"></div>
                        DEANA CUNNINGHAM
                        <p>PROJECT MANAGER</p>
                        <p>MOBILE</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                       NICOLE DREWRY
                        <p>FRONTEND</p>
                        <p>MOBILE</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        GIULLYA SANTOS
                        <p>FRONTEND</p>
                        <p>WEB</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        DENNIS KLINGENER
                        <p>FRONTEND</p>
                        <p>WEB</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        PAUL PUHNATY
                        <p>DATABASE</p>
                        <p>BACKEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        JITHIN SAMUEL
                        <p>BACKEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        JUSTIN SAMUEL
                        <p>BACKEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        WILLIAMS OREMA
                        <p>BACKEND</p>
                    </div>

                </div>
            </div>

        </div>
    );
};


export default AboutUsPage;
