import React from 'react';
import { TextField, Button, Grid, Container, Typography, Paper } from '@mui/material';

const MyPage = () => {
  const [movieTitle, setMovieTitle] = React.useState('');
  const [trailers, setTrailers] = React.useState('');
  const [noSearchError, setNoSearchError] = React.useState('');
  const [noMovies, setNoMovies] = React.useState('');
  const [currentTrailer, setCurrentTrailer] = React.useState('');
  const [addMovieTitle, setAddMovieTitle] = React.useState('');
  const [addMovieLink, setAddMovieLink] = React.useState('');
  const [addTrailerError, setAddTrailerError] = React.useState('');

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
          setNoMovies(true);
          setMovieTitle('');
        }else{
          setNoMovies(false);
          setTrailers(data);
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

  const handleAddMovieLink = async (res) =>{
    if(addMovieLink === '' || addMovieTitle === '' || !addMovieLink.includes('https://www.youtube.com')){
      setAddTrailerError(true);
      setAddMovieLink('');
      setAddMovieTitle('');
    }else{
      setAddTrailerError(false);
      try{
        const response = await fetch('/api/addTrailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ addMovieTitle, addMovieLink })
        })
        setAddMovieLink('');
        setAddMovieTitle('');
        if(response.status !== 200){
          setAddTrailerError(true);
        }
      }catch(err){
        setAddMovieLink('');
        setAddMovieTitle('');
        console.log(err);
      }
    }
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>
        Movie Trailers
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Movie Title"
            name="field1"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Search
          </Button>
        </Grid>
        {trailers && !noMovies && !noSearchError && (
          <Grid item xs={12}>
            <Typography variant="h5">Movie Trailers For: {currentTrailer}</Typography>
            {trailers.map((trailer, index) => (
              <Paper key={index} elevation={3} sx={{ marginTop: '20px', padding: '10px' }}>
                <iframe
                  width="100%"
                  height="400"
                  src={trailer.link}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Paper>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography sx={{ display: noSearchError ? 'block' : 'none', color: 'red' }}>Please enter a movie title</Typography>
          <Typography sx={{ display: noMovies ? 'block' : 'none', color: 'red' }}>There are no movie trailers for this movie</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3' sx = {{marginTop: '50px', marginBottom: '30px' }}>Add Movie Trailer</Typography>
        <TextField
          fullWidth
          label="Movie Name"
          variant="outlined"
          value={addMovieTitle}
          onChange={(e)=> setAddMovieTitle(e.target.value)}
          sx={{marginBottom: '20px'}}
        />
        <TextField
          fullWidth
          label="Trailer Link"
          variant="outlined"
          value={addMovieLink}
          onChange={(e)=> setAddMovieLink(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleAddMovieLink}
          sx = {{marginTop: '20px', marginBottom: '20px'}}
        >
          Add Movie Trailer
        </Button>
        <Typography variant='p' sx={{color: 'red', display: addTrailerError ? 'block' : 'none'}}> There is an error with the form</Typography>
      </Grid>
    </Container>
  );
};

export default MyPage;
