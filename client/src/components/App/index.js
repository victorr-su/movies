import React from 'react';
import { AppBar, Button, Typography } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Review from '../Review';
import Landing from '../Landing';
import MyPage from '../MovieTrailers/index';
import Search from '../Search/index';

const App = () => {
  const location = useLocation();

  return (
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MovieTrailer" element={<MyPage />} />
        </Routes>

        <AppBar sx={{ marginBottom: '50px', display: 'flex'}}>
          <div style={{ display: 'flex'}}>
            <Link to="/">
              <Button color="inherit" style={{ color: location.pathname === '/' ? 'black' : 'white' }} disabled={location.pathname === '/'} className = "Landing">
                Landing
              </Button>
            </Link>

            <Link to="/Search">
              <Button color="inherit" style={{ color: location.pathname === '/Search' ? 'black' : 'white' }} disabled={location.pathname === '/Search'}>
                Search
              </Button>
            </Link>

            <Link to="/Review">
              <Button color="inherit" style={{ color: location.pathname === '/Review' ? 'black' : 'white' }} disabled={location.pathname === '/Review'}>
                Review
              </Button>
            </Link>

            <Link to="/MovieTrailer">
              <Button color="inherit" style={{ color: location.pathname === '/MovieTrailer' ? 'black' : 'white' }} disabled={location.pathname === '/MovieTrailer'}>
                Movie Trailer
              </Button>
            </Link>
              <Typography sx = {{display:'flex', alignItems: 'center', marginLeft:'50px', color: 'white'}}>You are on page: {location.pathname === '/' ? 'Landing' : location.pathname.substring(1, location.pathname.length)}</Typography>
          </div>
        </AppBar>
      </div>
  );
};

export default App;
