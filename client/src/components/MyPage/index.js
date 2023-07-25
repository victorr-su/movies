import React from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const MyPage = () => {
  const [movieTitle, setMovieTitle] = React.useState();

  const handleSubmit = () =>{

  }
  return(
  <Container maxWidth="sm" sx = {{marginTop: '100px'}}>
    <Typography variant='h3' sx ={{marginBottom: '30px'}}> Movie Trailers </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Movie Title"
          name="field1"
          onChange={(e)=> setMovieTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" onClick = {handleSubmit}>
          Search
        </Button>
      </Grid>
    </Grid>
  </Container>
  )
};

export default MyPage;
