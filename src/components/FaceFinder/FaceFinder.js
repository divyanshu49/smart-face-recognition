import React from 'react';
import 'tachyons';
import './FaceFinder.css';

const FaceFinder = ({imageUrl, box}) => {
    return(
        <div className='center'>
            <div className = 'absolute mt2'>
                <img id='inputimage'  src={imageUrl} alt='faceImage' width='500px' height = 'auto'/>
                <div className='bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>    
        </div>
    );
}

export default FaceFinder;