import React, { useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import '../styles/Login.css'
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4'
import SenseiImage from './SenseiImage.js'

const LoginForm = () => {

var bp = require("./Path.js");
  var storage = require("../tokenStorage.js");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  const doLogin = async (event) => {
    event.preventDefault();
    console.log(loginName);
    console.log(loginPassword);
    var obj = { login: loginName, password: loginPassword };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("api/login"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    axios(config)
      .then(function (response) {
        var res = response.data;
        if (res.error) {
          setMessage("User/Password combination incorrect");
        } else {
          storage.storeToken(res.token);
          var uddecoded = decode(storage.retrieveToken(), { complete: true });

          try {
            var ud = uddecoded;
            var userId = ud.userId;
            var firstName = ud.firstName;
            var lastName = ud.lastName;
            var user = { firstName: firstName, lastName: lastName, id: userId };
            localStorage.setItem("user_data", JSON.stringify(user));
            window.location.href = "/landing";
          } catch (e) {
            console.log(e.toString());
            return "";
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    return (
        <div>
             <video autoPlay muted loop className='BackgroundVideo'>
                <source src={BackgroundVideo} type='video/mp4' />
             </video>
            <div className='wrapper'>
                <form onSubmit={doLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type="text" id="loginName" placeholder='Username' required value={loginName} onChange={(e) => setLoginName(e.target.value)}/>
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="password" id='loginPassword' placeholder='Password' required value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}/>
                        <FaUnlockAlt className='icon'/>                
                    </div>

                    <div className='remember-forgot'>
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type= "submit" onClick={doLogin}>Login</button>

                    <div className='register-link'>
                        <p>Don't have an account? <a href= "#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default LoginForm;
