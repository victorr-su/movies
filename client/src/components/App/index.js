import React from 'react';
import { AppBar, Button, Typography, Toolbar, Box } from '@mui/material';
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

      <AppBar sx={{ backgroundColor: '#2196F3'}}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Link to="/">
              <Button color="inherit" component="div" sx={{ color: location.pathname === '/' ? 'black' : 'white', flexGrow: 1 }}>
                Landing
              </Button>
            </Link>

            <Link to="/Search">
              <Button color="inherit" component="div" sx={{ color: location.pathname === '/Search' ? 'black' : 'white', flexGrow: 1 }}>
                Search
              </Button>
            </Link>

            <Link to="/Review">
              <Button color="inherit" component="div" sx={{ color: location.pathname === '/Review' ? 'black' : 'white', flexGrow: 1 }}>
                Review
              </Button>
            </Link>

            <Link to="/MovieTrailer">
              <Button color="inherit" component="div" sx={{ color: location.pathname === '/MovieTrailer' ? 'black' : 'white', flexGrow: 1 }}>
                Movie Trailer
              </Button>
            </Link>
          </Box>
          <Typography sx={{ color: 'white' }}>You are on page: {location.pathname === '/' ? 'Landing' : location.pathname.substring(1, location.pathname.length)}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default App;
