import React, { Component } from 'react';
import Sky from 'react-sky';
import virusImg from '../../../virus.png'



const Virus = () => {

    return (
      <div>
        <Sky
          images={{
            0: virusImg, 
            1: virusImg,
            2: virusImg,
          }}
          how={130} /* Pass the number of images Sky will render chosing randomly */
          time={40} /* time of animation */
          size={'30px'} /* size of the rendered images */
           background={'white'} /* color of background */
        />
      </div>
    );
  
}

export default Virus;