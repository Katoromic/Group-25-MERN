import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import { FaUnlockAlt } from "react-icons/fa";


import '../styles/SignupForm.css';

function ResetPasswordForm() {

  const bp = require("./Path.js");
  const storage = require("../tokenStorage.js");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const doPasswordChange = async (event) => {
    event.preventDefault();

    const passwordBox = document.getElementById('PasswordInput');
    const passwordConfirmBox = document.getElementById('ConfirmPasswordInput');
    passwordBox.style.borderColor = "black";
    passwordConfirmBox.style.borderColor = "black";

    if (!Password)
    {
      console.warn("missing password!");
      passwordBox.style.borderColor = "red";
    }
    if (!ConfirmPassword)
    {
      console.warn("missing password confirmation!");
      passwordConfirmBox.style.borderColor = "red";
    }

    if (Password && ConfirmPassword)
    {
      if (Password === ConfirmPassword)
      {
        let obj = { token: token, password: Password };
        let js = JSON.stringify(obj);
        let config = {
          method: "post",
          url: bp.buildPath("api/resetPassword"),
          headers: {
            "Content-Type": "application/json",
          },
          data: js,
        };
        axios(config)
          .then(function (response) {
            if (response.status === 200)
            {
              let res = response.data;
              storage.storeToken(res.token);
              let uddecoded = decode(storage.retrieveToken(), { complete: true });

              try
              {
                let { userId, firstName, lastName, verified } = uddecoded;
                let user = { firstName: firstName, lastName: lastName, id: userId, verified: verified };
                localStorage.setItem("user_data", JSON.stringify(user));

                if (verified)
                {
                  window.location.href = "/landing";
                }
                else
                {
                  window.location.href = "/CheckEmail";
                }
              }
              catch (e)
              {
                console.error(e.message);
              }
            }
            else
            {
              console.error(response.data.error);
            }
          })
          .catch(function (error)
          {
            if (error.response.status === 401)
            {
              window.alert('The password reset link has expired');
              //console.error('The password reset link has expired');
            }
            else
            {
              console.error(error);
            }
          });
      }
      else
      {
        console.warn("No match!");
        passwordBox.style.borderColor = "red";
        passwordConfirmBox.style.borderColor = "red";
      }
    }
  };


  return (

    <div id="SignupParentElement" className='wrapper'>

      <form onSubmit={doPasswordChange}>

          <h1>Enter a new password</h1>

          <div className='input-box'>
              <input type="password" id='PasswordInput' placeholder='Password' required value={Password} onChange={(e) => setPassword(e.target.value)}/>
              <FaUnlockAlt className='icon'/>
          </div>

          <div className='input-box'>
              <input type="password" id='ConfirmPasswordInput' placeholder='Confirm Password' required value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <FaUnlockAlt className='icon'/>
          </div>

          <button type= "submit">Confirm</button>

          {/* <div className='register-link'>
              <p>Already have an account? <a href= "/login">Login</a></p>
          </div> */}
                    
      </form>
    </div>
  );
}

export default ResetPasswordForm;