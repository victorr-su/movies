import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


const MovieSelection = ({movies, handleMovieSelection, errorMessage, selectedMovie}) => {
  
  const handleSelectChange = (movieName, movieID) => {
    handleMovieSelection(movieName, movieID);
  };

  return (
    <>
        <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
          Select a Movie
        </Typography>
        <FormControl sx = {{minWidth: '120px'}}>
          <InputLabel>Movies</InputLabel>
            <Select
              id="demo-simple-select"
              sx={{marginBottom: '30px'}}
              value={selectedMovie}
              label="Movies"
            >
              {movies?.movies.map((movie)=>{
                return (
                <MenuItem key={movie.id} value={movie.name} onClick={() => handleSelectChange(movie.name, movie.id)}> {movie.name} </MenuItem>
                )
              })}
            </Select>
        </FormControl>
        {errorMessage && <p style = {{color: "red", marginTop: "-25px"}}>Select your movie</p>}
    </>
  );
}

export default MovieSelection;