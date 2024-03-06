import React from "react";
import '../styles/LoginButton.css'

function LoginButton() {
    return(
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-end align-items-center">
                    <button type="button" id="LoginButtonElement" className="btn">I ALREADY HAVE AN ACCOUNT</button>
                </div>
            </div>
        </div>




    );
};

export default LoginButton;