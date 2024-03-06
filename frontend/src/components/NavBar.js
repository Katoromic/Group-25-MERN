import React from 'react';
import '../styles/NavBar.css'
import HomeButton from './HomeButton';
import GitHubButton from './GitHubButton';
import AboutUsButton from './AboutUsButton';


function NavBar() {
    return (
        <div id='NavBarBackGround'>
            <nav className='navbar navbar-default bg-customNavBar'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center justify-content-end w-100'>
                        <HomeButton />
                        <GitHubButton />
                        <AboutUsButton />
                    </div>
                </div>
            </nav>
        </div>           
    );
};

export default NavBar;

