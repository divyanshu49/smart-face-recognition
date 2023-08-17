import React from 'react';

class Rank extends React.Component {

    render(){
        const {name, entries} = this.props; 
        return(
            <div>
                <div className='white f3 i b'>{`Hi, ${name} your rank is..... `}</div>
                <div className='white f1 b'>
                    {entries}
                </div>
            </div>
        );
    }

    
}

export default Rank;