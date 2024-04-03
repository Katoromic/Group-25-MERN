import React from 'react';

import '../styles/HomePage.css'
import BackgroundVideo from '../images/background.mp4'

import NavBar from '../components/NavBar';
import LoginTitle from '../components/LoginTitle';
import LoginSubTitle from '../components/LoginSubTitle';
import SenseiImage from '../components/SenseiImage'
import GetStartedButton from '../components/GetStartedButton';
import LoginButton from '../components/LoginButton';

const LoginPage = () => {
    return (

        <div id='LoginPage' className='overflow-auto'>

            <video autoPlay muted loop className='BackgroundVideo'>
                <source src={BackgroundVideo} type='video/mp4' />
            </video>

            <div className='container'>

                <div className='row'>
                    <div className='col d-flex align-items-center justify-content-center'>
                        <NavBar />
                    </div>
                </div>

                <div className='row'>
                    <LoginTitle />
                </div>

                <div className='row'>
                    <LoginSubTitle />
                </div>

            
                <div className='row d-none d-xl-block'> 
                    <SenseiImage />
                </div>

                <div className='row'>
                    <GetStartedButton />
                </div>

                <div className='row'>
                    <LoginButton />
                </div>

            </div>

        </div>
    );
};


export default LoginPage;