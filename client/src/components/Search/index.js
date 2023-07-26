import React from 'react';
import { TextField, Button, Grid, Container, Typography, Paper } from '@mui/material';

const Search = () => {
  const [movieTitle, setMovieTitle] = React.useState('');
  const [actorName, setActorName] = React.useState('');
  const [directorName, setDirectorName] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(false);

  const handleSubmit = async () => {
    // clear data before running another search
    setSearchResults([]);
    setErrorMessage(false);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieTitle, actorName, directorName })
      });

      const data = await response.json();

      if (data.length === 0) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
        setSearchResults(data);
      }
      setMovieTitle('');
      setActorName('');
      setDirectorName('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>
        Search
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
          <TextField
            fullWidth
            label="Actor Name"
            name="actorName"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Director Name"
            name="directorName"
            value={directorName}
            onChange={(e) => setDirectorName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Search
          </Button>
        </Grid>

        <Grid item xs={12}>
          {searchResults.map((result, index) => (
            <Paper key={index} elevation={3} sx={{ padding: '15px', marginBottom: '20px' }}>
              {Object.entries(result).map(([key, value], dataIndex) => (
                <Typography key={dataIndex} variant="body1" sx={{ marginBottom: '5px' }}>
                  {key}: {value === null ? 'none' : value}
                </Typography>
              ))}
            </Paper>
          ))}
          <Typography sx={{ display: !errorMessage ? 'none' : 'block', color: 'red' }}>
            No movies match your search result
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
