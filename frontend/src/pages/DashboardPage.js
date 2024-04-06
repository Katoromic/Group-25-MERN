import React from 'react'; 
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import '../styles/Dashboard.css'
import { FaUserAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4';
import NavBar from '../components/NavBar';
import CLogo from '../images/c logo.PNG';
import JavaLogo from '../images/java logo.PNG';
import JSLogo from '../images/js logo.PNG';
import LoadingPage from './LoadingPage.js';


const DashboardPage = () => {

    var bp = require("../components/Path.js");
    var storage = require("../tokenStorage.js");
    const [message, setMessage] = useState("");
    const [courses, setCourses] = useState([]);
    const [courseInfo, setCourseInfo] = useState([]);
    var courseInfoArray = [];
    const [isLoaded, setIsLoaded] = useState(false);

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

    useEffect(() => {
        console.log("courseInfo FROM USEEEFFT: ", courseInfo);
    }, [courseInfo]);

    useEffect(() => {getCourses()}, []); // load the cards upon page load

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
        try {
            const response = await axios(config);
            var res = response.data;
            if (res.error) {
                setMessage("Error getting courses");
            } else {
                setCourses(res.courses);
                console.log("res.courses: ", res.courses); 
                const courseInfoArray = await getCourseInfo(res.courses);
                setCourseInfo(courseInfoArray);
                console.log("courseInfo: ", courseInfo);
                setIsLoaded(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    function getCourseInfo(courses) {
        return new Promise(async (resolve, reject) => {
            let promises = [];
            console.log("courses: ", courses);

        if (courseInfoArray.length <= 0) {
            console.log("courseInfoArray is length", courseInfoArray.length);
        for (let i = 0; i < courses.length; i++) {
            var config = {
          method: "get",
          url: bp.buildPath("api/getCourse/" + courses[i].Language),
        };
        let promise = axios(config)
          .then(function (response) {
            var res = response.data;
            if (res.error) {
              setMessage("Error getting courses");
            } else {
        
              try { 
                console.log("res in getCourseInfo ", res);
                courseInfoArray.push(res);
                console.log("array after push ", courseInfoArray);
              } catch (e) {
                console.log(e.toString());
                return "";
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
          promises.push(promise);
        }
        }

        await Promise.all(promises);
        //setCourseInfo(courseInfoArray);
        resolve(courseInfoArray);
    });
    }

    function Dashboard({courses, courseInfo}) {
        console.log("courseInfo in Dashboard: ", courseInfo);
        return (
            <>
            {isLoaded ?
            <div className='dashboard' id="dashboard">
                    <button className= 'course' id= 'cbutton'>    {/*{HandleClick.bind(null, 'python')}*/}
                        <img className= 'logo' src={courseInfo[0].courseData.LogoFile} />
                        <h1>{courseInfo[0].courseData.Description}</h1>
                        <div className='progressBar'> 
                            <div className= 'progressBar-inner' style={{width: courses[0].CurrentQuestion*10 + '%'}}></div>
                        </div>
                        <p>{courses[0].CurrentQuestion*10}% complete</p>
                        <p>{courses[0].NumCorrect} out of 10 correct</p>
                    </button>
                    <button className= 'course' id='javabutton'>
                        <img className= 'logo' src={courseInfo[1].courseData.LogoFile} />
                        <h1>{courseInfo[1].courseData.Description}</h1>
                        <div className='progressBar'> 
                            <div className= 'progressBar-inner' style={{width: courses[1].CurrentQuestion*10 + '%'}}></div>
                        </div>
                        <p>{courses[1].CurrentQuestion*10}% complete</p>
                        <p>{courses[1].NumCorrect} out of 10 correct</p>
                    </button>
                    <button className= 'course' id= 'jsbutton'>
                        <img className= 'logo' src={courseInfo[2].courseData.LogoFile} />
                        <h1>{courseInfo[2].courseData.Description}</h1>
                        <div className='progressBar'> 
                            <div className= 'progressBar-inner' style={{width: courses[2].CurrentQuestion*10 + '%'}}></div>
                        </div>
                        <p>{courses[2].CurrentQuestion*10}% complete</p>
                        <p>{courses[2].NumCorrect} out of 10 correct</p>
                    </button>
                </div>: <LoadingPage></LoadingPage>}
                </>
        );
    }

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
                <Dashboard courses={courses} courseInfo={courseInfo}/>
            </div>
        </div>
    );
};


export default DashboardPage;
