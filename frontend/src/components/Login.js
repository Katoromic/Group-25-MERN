import React, { useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";

function Login() {
  var bp = require("./Path.js");
  var storage = require("../tokenStorage.js");
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState("");
  const doLogin = async (event) => {
    event.preventDefault();
    var obj = { login: loginName.value, password: loginPassword.value };
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
          storage.storeToken(res);
          var uddecoded = decode(storage.retrieveToken(), { complete: true });

          try {
            var ud = uddecoded;
            var userId = ud.userId;
            var firstName = ud.firstName;
            var lastName = ud.lastName;
            var user = { firstName: firstName, lastName: lastName, id: userId };
            localStorage.setItem("user_data", JSON.stringify(user));
            window.location.href = "/cards";
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
    <div id="loginDiv">
      <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span>
        <br />
        <input
          type="text"
          id="loginName"
          placeholder="Username"
          ref={(c) => (loginName = c)}
        />
        <br />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <br />

        <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Do It"
          onClick={doLogin}
        />
      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
}

export default Login;
