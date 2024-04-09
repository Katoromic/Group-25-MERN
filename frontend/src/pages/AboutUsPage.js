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
                        WE OFFER A PLATFORM FOR STUDENTS TO LEARN CODING BASICS IN A SUPPORTIVE
                        <p>SETTING LESSONS ARE SIMPLE, INTERACTIVE, AND BEGINNER-FRIENDLY.</p>
                    </div>
                </div>
                <div className='aboutUsBody'>
                    <div>
                        <div id="circleImage"></div>
                        PAUL PUHNATY
                        <p>DATABASE - BACKEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                       DENNIS KLINGENER
                       <p>FRONTEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        JUSTIN SAMUEL
                        <p>BACKEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        GIULLYA SANTOS
                        <p>FRONTEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        NICOLE DREWRY
                        <p>MOBILE</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        Name here
                        <p>MOBILE</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        Name here
                        <p>BACKEND</p>
                    </div>
                    <div>
                        <div id="circleImage"></div>
                        Name here
                        <p>BACKEND</p>
                    </div>

                </div>
            </div>

        </div>
    );
};


export default AboutUsPage;
