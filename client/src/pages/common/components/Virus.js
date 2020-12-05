import React from 'react';
import Sky from 'react-sky';
import virusImg from '../../../virus.png'



const Virus = () => {

  return (
    <div>
      <Sky
        images={{
          0: virusImg,
        }}
        how={150} /* Pass the number of images Sky will render chosing randomly */
        time={50} /* time of animation */
        size={'30px'} /* size of the rendered images */

      />
    </div>
  );

}

export default Virus;
