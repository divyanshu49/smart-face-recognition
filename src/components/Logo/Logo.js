import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './logo-brain.png';

const Logo = () => {
    return(
            <div className = 'ma4 mt0'>
                <Tilt className = 'Tilt br2 shadow-2' scale={1.15} transitionSpeed = {1000}>
                    <div>
                        <img className = 'brain_logo_img' src = {brain} alt="Brain-Logo" />
                        <h3> Brain&copy;2023 </h3>
                    </div>
                </Tilt>
            </div>
    );
}

export default Logo;