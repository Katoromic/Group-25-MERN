import React, {useState} from 'react';

import '../styles/ForgotPassword.css';
import BackGroundVideo from '../images/background.mp4'

import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPassword = () => {

    return (

        <div className='container-fluid'>

            <video autoPlay muted loop className='BackGroundVideo'>
                <source src={BackGroundVideo} type='video/mp4' />
            </video>

            <div className='row'>
                <div className='col d-flex justify-content-center align-items-center'>
                    <ForgotPasswordForm />
                </div>
            </div>
            
        </div>
    );
};

export default ForgotPassword;