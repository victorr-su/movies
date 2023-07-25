import React from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const MyPage = () => {
  const [movieTitle, setMovieTitle] = React.useState();
  const [trailer, setTrailer] = React.useState();

  const handleSubmit = async () =>{
    try{
      const response = await fetch('/api/trailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieTitle })
      })
      const data = await response.json();
      setTrailer(data[0].link);
    }catch(err){
      console.log(err);
    }
  }
  console.log(trailer);
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
      {trailer &&
        <Grid item xs ={12}>
          <Typography sx = {}>Movie Trailer For: {movieTitle}</Typography>
          <iframe
            width="100%"
            height="400"
            src= {trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Grid>
      }
    </Grid>
  </Container>
  )
};

export default MyPage;
