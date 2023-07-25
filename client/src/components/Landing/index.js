import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import picture from './picture.jpg';

const Landing = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h2" sx={{ marginTop: '20px', marginBottom: '20px' }}>Victor's Movie Review Website</Typography>
        <img src={picture} alt="Movie Review" style={{ width: '100%', maxWidth: '400px' }} />
      </Paper>
    </Container>
  );
};

export default Landing;
