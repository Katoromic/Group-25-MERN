import React from "react";
import '../styles/GetStartedButton.css'

function GetStartedButton() {
    return (
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-end align-items-center">
                    <button type="button" id="GetStartedButtonElement" className="btn">GET STARTED</button>
                </div>
            </div>
        </div>
    );
};

export default GetStartedButton;