import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import picture from './picture.jpg';

const Landing = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h2" sx={{ marginTop: '20px', marginBottom: '20px' }}>Welcome to Victor's Movie Review Website</Typography>
        <img src={picture} alt="Movie Review" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} />
        <Typography variant="body1" sx={{ marginTop: '20px', textAlign: 'center' }}>
          Are you a movie lover? Want to read and share your thoughts on the latest movies? Look no further! Victor's Movie Review Website is the perfect place for you. Explore a wide range of movie reviews, written by our community of movie enthusiasts.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Landing;
