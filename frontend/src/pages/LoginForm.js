import React from 'react'; 
import '../styles/Login.css'
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4'
import SenseiImage from '../components/SenseiImage'

const LoginForm = () => {
    return (
        <div>
             <video autoPlay muted loop className='BackgroundVideo'>
                <source src={BackgroundVideo} type='video/mp4' />
             </video>
            <div className='wrapper'>
                <form action= "">
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type="text" placeholder='Username' required/>
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder='Password' required/>
                        <FaUnlockAlt className='icon'/>                
                    </div>

                    <div className='remember-forgot'>
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type= "submit">Login</button>

                    <div className='register-link'>
                        <p>Don't have an account? <a href= "#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default LoginForm;
