import * as React from 'react';
import Review from '../Review';
import Landing from '../Landing';
import { AppBar, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  MyPage  from '../MyPage/index';
import  Search  from '../Search/index';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>

        <AppBar sx={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex' }}>
            <Link to="/">
              <Button color="inherit">Landing</Button>
            </Link>
            <Link to="/Search">
            <Button color="inherit">Search</Button>
            </Link>
            <Link to="/Review">
              <Button color="inherit">Review</Button>
            </Link>
            <Link to="/MyPage">
            <Button color="inherit">MyPage</Button>
            </Link>
          </div>
        </AppBar>
      </div>
    </Router>
  );
};

export default App;
