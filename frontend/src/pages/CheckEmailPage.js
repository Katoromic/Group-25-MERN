import React, { useState } from "react";

import '../styles/LoginForm.css'
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4'

const CheckEmailPage = () => {

    return (
        <div>
            <video autoPlay muted loop className='BackgroundVideo'>
              <source src={BackgroundVideo} type='video/mp4' />
            </video>

            <div className='wrapper'>
                    <h1>Almost there!</h1>
                    <div className='register-link'>
                      <p>Check your email for the link we sent you, then <a href= "/login">Login</a></p>
                    </div>

            </div>
        </div>
    );
};


export default CheckEmailPage;