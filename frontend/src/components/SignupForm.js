import React, { useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";

import { FaUserAlt } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";

function SignupForm() {

    var bp = require("./Path.js");
  var storage = require("../tokenStorage.js");
  const [loginFirst, setLoginFirst] = useState("");
  const [loginLast, setLoginLast] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  const doSignup = async (event) => {
    event.preventDefault();
    console.log(loginFirst);
    console.log(loginLast);
    console.log(loginEmail);
    console.log(loginUserName);
    console.log(loginPassword);
    // Incoming: FirstName, LastName, Email, Username, Password
    var obj = { FirstName: loginFirst, LastName: loginLast, Email: loginEmail, Username: loginUserName, Password: loginPassword };
    var js = JSON.stringify(obj);
    var config = {
      method: "post",
      url: bp.buildPath("api/signup"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    axios(config)
      .then(function (response) {
        var res = response.data;
        if (res.error) {
          setMessage("Something went wrong");
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
            window.location.href = "/login";
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
        <div className='wrapper'>
                    <form onSubmit={doSignup}>
                        <h1>Sign Up</h1>

                        <div className='input-box'>
                            <input type="text" id='loginFirst' placeholder='First Name' required value={loginFirst} onChange={(e) => setLoginFirst(e.target.value)}/>
                        </div>

                        <div className='input-box'>
                            <input type="text" id='loginLast' placeholder='Last Name' required value={loginLast} onChange={(e) => setLoginLast(e.target.value)}/>
                        </div>

                        <div className='input-box'>
                            <input type="text" id='loginEmail' placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                        </div>

                        <div className='input-box'>
                            <input type="text"  id='LoginUserName' placeholder='Username' required value={loginUserName} onChange={(e) => setLoginUserName(e.target.value)}/>
                            <FaUserAlt className='icon' />
                        </div>

                        <div className='input-box'>
                            <input type="password" id='LoginPassword' placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                            <FaUnlockAlt className='icon'/>                
                        </div>

                        <div className='input-box'>
                            <input type="password" placeholder='Confirm Password' required/>
                            <FaUnlockAlt className='icon'/>                
                        </div>

                        <div className='remember-forgot'>
                            <label><input type="checkbox"/>Remember me</label>
                        </div>

                        <button type= "submit" onClick={doSignup}>Sign Up</button>

                        <div className='register-link'>
                            <p>Already have an account? <a href= "/login">Login</a></p>
                        </div>
                        
                    </form>
                </div>
    );
};

export default SignupForm;
