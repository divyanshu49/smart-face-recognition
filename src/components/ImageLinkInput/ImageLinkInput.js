import React from 'react';
import './ImageLinkInput.css';


const ImageLinkInput = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className = 'white f3 i b'>
            {'Enter the image url for a face to be detected:'}
            </p>
            <div className='center'>
                <div className = 'form pa4 br3 shadow-5'>
                    <input className = 'f4 pa2 w-80 center' type = 'text' onChange = {onInputChange} />
                    <div className='mt3'></div>
                    <button className = 'w-20 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkInput;