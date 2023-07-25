import React from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const MyPage = () => {
  const [movieTitle, setMovieTitle] = React.useState('');
  const [trailer, setTrailer] = React.useState('');
  const [noSearchError, setNoSearchError] = React.useState('');
  const [noMovies, setNoMovies] = React.useState('');
  const [currentTrailer, setCurrentTrailer] = React.useState('');

  const handleSubmit = async () =>{
    if(movieTitle !== ''){
      setNoSearchError(false);
      // make api call to retrieve the url link
      try{
        const response = await fetch('/api/trailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ movieTitle })
        })
        const data = await response.json();
        // check if there is a movie trailer for that given movie
        if(data.length === 0){
          setNoMovies(true)
        }else{
          setNoMovies(false);
          setTrailer(data[0].link);
          setCurrentTrailer(movieTitle);
          setMovieTitle('');
        }
      }catch(err){
        console.log(err);
      }
    }else{
      setNoMovies(false);
      setNoSearchError(true);
    }
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
          value={movieTitle}
          onChange={(e)=> setMovieTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
      <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleSubmit}>
      Search
      </Button>
      </Grid>
      {(trailer && !noMovies && !noSearchError)  &&
        <>
          <Grid item xs ={12}>
            <Typography>Movie Trailer For: {currentTrailer}</Typography>
            <iframe
              width="100%"
              height="400"
              src= {trailer}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Grid>
        </>
      }
      <Grid item xs={12}>
        <Typography sx = {{display: noSearchError ? 'block' : 'none', color: 'red'}}>Please enter a movie title</Typography>
        <Typography sx = {{display: noMovies? 'block' : 'none', color: 'red'}}>There are no movie trailers for this movie</Typography>
      </Grid>
    </Grid>
  </Container>
  )
};

export default MyPage;
