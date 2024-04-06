import React from 'react'; 
import { useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import '../styles/Dashboard.css'
import { FaUserAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4';
import NavBar from '../components/NavBar';
import CLogo from '../images/c logo.PNG';
import JavaLogo from '../images/java logo.PNG';
import JSLogo from '../images/js logo.PNG';


const DashboardPage = () => {

    var bp = require("../components/Path.js");
    var storage = require("../tokenStorage.js");
    const [message, setMessage] = useState("");

    // for passing information to other pages.
    const navigate = useNavigate();

    const GetQuestionBank = async (CourseID) => {
        try {
            const response = await axios.get(bp.buildPath('api/course-question-bank/' + CourseID));
            const { questions, error } = response.data;
            console.log(bp.buildPath('api/course-question-bank/' + CourseID));
            console.log(response);


            if (error) {
                console.error('Error fetching data:', error);
                return []; 
            }
            
            return questions;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const HandleClick = async (CourseID) => {

        try {
            const Questions = await GetQuestionBank(CourseID);
            navigate('/Questions', {state: {progress: 1, correct: 1, QuestionBank: Questions}});
        } catch (error) {
            console.log('It Broke! >:(')
        }
        
    };
    
    const getCourses = async (event) => {
    
        var token = storage.retrieveToken();
        console.log(token);
        var config = {
          method: "get",
          url: bp.buildPath("api/user-courses"),
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        };
        console.log(config);
        axios(config)
          .then(function (response) {
            var res = response.data;
            if (res.error) {
              setMessage("Error getting courses");
            } else {
        
              try {
                console.log(res.courses[0].Language);      
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

             <div classname = 'container'>
                <div className='row'>
                    <div className='col d-flex align-items-center justify-content-center'>
                        <NavBar />
                    </div>
                </div>
                <div className='title'>
                    <h1>MY COURSES</h1>
                </div>
                <div className='dashboard'>
                    <button className= 'course' id= 'cbutton' onClick={getCourses}>    {/*{HandleClick.bind(null, 'python')}*/}
                        <img className= 'logo' src={CLogo} />
                        <h1>Learning C From Zero to Hero</h1>
                        <div className='progressBar'> 
                            <div className= 'progressBar-inner' style={{width: '90%'}}></div>
                        </div>
                        <p>90% complete</p>
                    </button>
                    <button className= 'course' id='javabutton'>
                        <img className= 'logo' src={JavaLogo} />
                        <h1>Build a Solid Foundation in Java</h1>
                        <div className='progressBar'> 
                            <div className= 'progressBar-inner' style={{width: '0%'}}></div>
                        </div>
                        <p>0% complete</p>
                    </button>
                    <button className= 'course' id= 'jsbutton'>
                        <img className= 'logo' src={JSLogo} />
                        <h1>Bringing Web Pages to Life With JavaScript</h1>
                        <div className='progressBar'> 
                            <div className= 'progressBar-inner' style={{width: '30%'}}></div>
                        </div>
                        <p>30% complete</p>
                    </button>  
                </div>
            </div>
        </div>
    );
};


export default DashboardPage;
