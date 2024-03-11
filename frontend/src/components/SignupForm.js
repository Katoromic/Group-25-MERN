import React from 'react';

import { FaUserAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";

function SignupForm() {
    return (
        <div className='wrapper'>
                    <form action= "">
                        <h1>Sign Up</h1>

                        <div className='input-box'>
                            <input type="text" id='name' placeholder='Name' required/>
                        </div>

                        <div className='input-box'>
                            <input type="text" id='email' placeholder='Email' required/>
                        </div>

                        <div className='input-box'>
                            <input type="text"  id='userName' placeholder='Username' required/>
                            <FaUserAlt className='icon' />
                        </div>

                        <div className='input-box'>
                            <input type="password" id='password' placeholder='Password' required/>
                            <FaUnlockAlt className='icon'/>                
                        </div>

                        <div className='input-box'>
                            <input type="password" placeholder='Confirm Password' required/>
                            <FaUnlockAlt className='icon'/>                
                        </div>

                        <div className='remember-forgot'>
                            <label><input type="checkbox"/>Remember me</label>
                        </div>

                        <button type= "submit">Sign Up</button>

                        <div className='register-link'>
                            <p>Already have an account? <a href= "/login">Login</a></p>
                        </div>
                        
                    </form>
                </div>
    );
};

export default SignupForm;
