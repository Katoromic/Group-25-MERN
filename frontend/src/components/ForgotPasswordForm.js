import React, {useState} from 'react';
import axios from "axios";
import '../styles/ForgotPasswordForm.css';



const ForgotPasswordForm = () => {

    // Stores the email and username?
    const [RecoveryData, SetRecoveryData] = useState ({username: '', email: ''});

    // Conditional display
    const [SuccessMessage, SetSuccessMessage] = useState(false);
    const [FailMessage, SetFailMesage] = useState(false);

    // Path builder
    var bp = require("./Path.js");

    // Handles changes in the input boxes.
    const HandleInputChange = (e) => {
        SetRecoveryData({...RecoveryData, [e.target.name]: e.target.value});
    };

    // This handles the subit for the recovery. Contacts the backend?
    const HandleRecoveryRequest = async () => {

            try {

                const response = await axios.post(bp.buildPath('api/requestPasswordReset'), RecoveryData);
                
                // error catch
                if(!response.data) {
                    throw new Error('Recovery Failure');
                }

            } catch (error) {
                console.log('it broke :(', error)
            }
    };
    
    return (

        <div className='container-fluid'>

            <div className='row'>

                <div className='col d-flex justify-content-center align-items-center'>

                    <div id='FormParentElement' >
                        
                        <h1 className='mb-4'>Password Recovery</h1>

                        {SuccessMessage && <h2 id='SuccessMessage' className='m-3'>Recovery successful! Please check your email.</h2>}
                        {FailMessage && <h2 id='FailMessage' className='m-3'>Uh oh something went wrong...</h2>}

                        <input type='text' name='username' value={RecoveryData.username} onChange={HandleInputChange} placeholder='Username' className='Input-Box mb-4'/>

                        <input type='text' name='email' value={RecoveryData.email} onChange={HandleInputChange} placeholder='Email' className='Input-Box' />

                        <button type='button' id='RequestButton' onClick={HandleRecoveryRequest} >Request</ button>


                    </div>

                </div>

            </div>
            
        </div>

    );
};

export default ForgotPasswordForm;
