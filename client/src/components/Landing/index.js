import { Typography } from '@mui/material';
import * as React from 'react';
import myImage from './client/src/components/Landing/picture.jpg';


const Landing = () => {
  return (
    <div>
      <Typography variant = 'h2' sx = {{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Victor's Movie Review Website</Typography>
      <img src={myImage}/>
    </div>
  );
}

export default Landing;