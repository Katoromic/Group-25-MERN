import React from 'react'; 
import '../styles/Login.css'
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4';
import Sensei from '../images/sensei.GIF'
import NavBar from '../components/NavBar';


const LoginPage = () => {
    return (
        <div>
             <video autoPlay muted loop className='BackgroundVideo'>
                <source src={BackgroundVideo} type='video/mp4' />
             </video>

             <div classname = 'container'>
                <div className='row'>
                    <div className='col d-flex align-items-center justify-content-center'>
                        <NavBar />
                    </div>
                </div>
                <div className='sensei'>
                    <img className="sensei" src={Sensei} />
                </div>
                
                <div className='wrapper'>
                    <form action= "">
                        <h1>LOGIN</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required/>
                            <FaUserAlt className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' required/>
                            <FaUnlockAlt className='icon'/>                
                        </div>

                        <div className='remember-forgot'>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type= "submit">LOGIN</button>

                        <div className='register-link'>
                            <p>Don't have an account? <a href= "#">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;
