import React from 'react';
import { AppBar, Button } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Review from '../Review';
import Landing from '../Landing';
import MyPage from '../MyPage/index';
import Search from '../Search/index';

const App = () => {
  const location = useLocation();

  return (
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>

        <AppBar sx={{ marginBottom: '50px', display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <Link to="/">
              <Button color="inherit" style={{ color: location.pathname === '/' ? 'black' : 'inherit' }} disabled={location.pathname === '/'}>
                Landing
              </Button>
            </Link>

            <Link to="/Search">
              <Button color="inherit" style={{ color: location.pathname === '/Search' ? 'black' : 'inherit' }} disabled={location.pathname === '/Search'}>
                Search
              </Button>
            </Link>

            <Link to="/Review">
              <Button color="inherit" style={{ color: location.pathname === '/Review' ? 'black' : 'inherit' }} disabled={location.pathname === '/Review'}>
                Review
              </Button>
            </Link>

            <Link to="/MyPage">
              <Button color="inherit" style={{ color: location.pathname === '/MyPage' ? 'black' : 'inherit' }} disabled={location.pathname === '/MyPage'}>
                MyPage
              </Button>
            </Link>
          </div>
        </AppBar>
      </div>
  );
};

export default App;
