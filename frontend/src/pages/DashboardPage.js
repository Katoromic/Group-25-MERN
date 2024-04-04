import React from 'react'; 
import '../styles/Dashboard.css'
import { FaUserAlt } from "react-icons/fa";
import BackgroundVideo from '../images/background.mp4';
import NavBar from '../components/NavBar';
import CLogo from '../images/c logo.PNG';
import JavaLogo from '../images/java logo.PNG';
import JSLogo from '../images/js logo.PNG';


const DashboardPage = () => {
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
                    <button className= 'course' id= 'cbutton'>
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