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

function Dashboard({courses, courseInfo, isLoaded, HandleClick}) {
    console.log("courseInfo in Dashboard: ", courseInfo);
    let info = [];
    // The following is me reorganizing the code because the indexes of the courseInfo array are not always in the order of the courses array.
    // This is because for whatever reason, the page gets rendered twice, which calls the APIs twice.
    // I don't know why this is happening, but this is a workaround.
    for (let i = 0; i < courseInfo.length; i++) {
        if (courseInfo[i].Language == 'c++') {
            info[0] = courseInfo[i]; // resets c++ to always be the 0th index, etc
        } else if (courseInfo[i].Language == 'python') {
            info[1] = courseInfo[i];
        } else if (courseInfo[i].Language == 'haskell') {
            info[2] = courseInfo[i];
        }
    }

    console.log("info: ", info);
    return (
        <>
        {isLoaded ?
        <div className='dashboard' id="dashboard">
                {info.map((c, index) => (
                    <button className= 'course' id= {c.Language} onClick={HandleClick.bind(null, c.Language)}>  
                    <img className= 'logo' src={c.LogoFile} />
                    <h1>{c.Description}</h1>
                    <div className='progressBar'> 
                        <div className= 'progressBar-inner' style={{width: courses[index].CurrentQuestion*10 + '%'}}></div>
                    </div>
                    <p>{courses[index].CurrentQuestion*10}% complete</p>
                    <p>{courses[index].NumCorrect} out of 10 correct</p>
                </button>
                ))}
            </div>: <LoadingPage></LoadingPage>}
            </>
    );
}

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

    const GetUserCourseInfo = async (CourseID) => {

        // Get the JWT token.
        var token = storage.retrieveToken();

        // Define json object for api request.
        var config = {
            method: "get",
            url: bp.buildPath("api/user-courses"),
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };

        try {

            // Attempt to access the api.
            const response = await axios(config);

            // extract the data 
            var res = response.data.courses;
            
            if (res.error) {
                setMessage("Error getting courses");
            } 

            // If we find the language we clicked on, return its info.
            for (let i = 0; i < res.length; i++) {

                if (res[i].Language === CourseID) {
                    console.log('hehehehahahahah');
                    console.log(res[i]);
                    return res[i];
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const HandleClick = async (CourseID) => {

        try {
            const Questions = await GetQuestionBank(CourseID);
            const UserCourseInfo = await GetUserCourseInfo(CourseID);
            const UserTokenRaw = storage.retrieveToken();
            const UserTokenDecoded = decode(storage.retrieveToken(), { complete: true });
            navigate('/Questions', {state: {QuestionBank: Questions, UserInfo: UserCourseInfo, UserTokenRaw: UserTokenRaw, UserTokenDecoded: UserTokenDecoded}});
        } catch (error) {
            console.log('It Broke! >:(')
        }
        
    };

    useEffect(() => {getCourses()}, []); // load the cards upon page load

    const getCourses = async (event) => {
        var token = storage.retrieveToken();
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
                const courseInfoArray = await getCourseInfo(res.courses);
                setCourseInfo(courseInfoArray);
                setIsLoaded(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    function getCourseInfo(courses) {
        return new Promise(async (resolve, reject) => {
            let promises = [];
        if (courseInfoArray.length <= 0) {
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
                courseInfoArray.push(res.courseData);
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
        resolve(courseInfoArray);
    });
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
                <Dashboard courses={courses} courseInfo={courseInfo} HandleClick={HandleClick} isLoaded={isLoaded}/>
            </div>
        </div>
    );
};


export default DashboardPage;
