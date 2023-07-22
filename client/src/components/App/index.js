import * as React from 'react';
import Review from './Review';
import Landing from '../Landing';
import { AppBar, Typography, Button } from '@mui/material';


const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/Review" element={<App/>}/>
        <Route path="/" element={<Landing />}/>
        <Route path="/" element={<Landing />}/>
      </Routes>
    </BrowserRouter>

      <AppBar sx = {{marginBottom: '50px'}}>
        <div style={{ display: 'flex' }}>
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

      <Landing/>
      {/* <Review/> */}
    </div>
  );
}

export default App;