import React from 'react';
import '../styles/NavBar.css'
import HomeButton from './HomeButton';
import GitHubButton from './GitHubButton';
import AboutUsButton from './AboutUsButton';
import { FaUserAlt } from "react-icons/fa";
import ShurikenX from '../images/FancyX.png'

function NavBar() {
    return (
        <div id='NavBarBackGround'>
            <nav className='navbar navbar-default bg-customNavBar'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center justify-content-end w-100'>
<<<<<<< Updated upstream
                        <img className= 'shuriken' src={ShurikenX}/>
=======
                        <img className='shuriken' src={ShurikenX}/>
>>>>>>> Stashed changes
                        <div class= 'home-underline-animation'>
                             <HomeButton />
                        </div>
                        <div class= 'github-underline-animation'>
                            <GitHubButton />
                        </div>
                        <div class= 'aboutus-underline-animation'>
                            <AboutUsButton />
                        </div>
                        <FaUserAlt className='profileIcon' />
                    </div>
                </div>
            </nav>
        </div>           
    );
};

export default NavBar;

