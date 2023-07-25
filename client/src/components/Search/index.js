import React from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';


const Search = () => {
  const [movieTitle, setMovieTitle] = React.useState();
  const [actorName, setActorName] = React.useState();
  const [directorName, setDirectorName] = React.useState();
  const [searchResults, setSearchResults] = React.useState();

  const handleSubmit = async () =>{
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieTitle, actorName, directorName })
      });
      const data = await response.json();
      console.log(data)
      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container maxWidth="sm" sx = {{marginTop: '100px'}}>
        <Typography variant='h3' sx ={{marginBottom: '30px'}}> Search </Typography>
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
            <TextField
              fullWidth
              label="Actor Name"
              name="actorName"
              onChange={(e)=> setActorName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Director Name"
              name="directorName"
              onChange={(e)=>setDirectorName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick = {handleSubmit}>
              Search
            </Button>
          </Grid>

          <Grid item xs={12}>
          {searchResults?.map((result, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              {Object.entries(result).map(([key, value], dataIndex) => (
                <Typography key={dataIndex} variant="body1">
                  {key}: {value === null ? 'none' : value}
                </Typography>
              ))}
            </div>
          ))}
          </Grid>

        </Grid>
    </Container>
  );
};

export default Search;
