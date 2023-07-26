import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Grid, Button, Box, Paper } from '@mui/material';

const Review = () => { 

  //states of the form and movie values
  const[movies, setMovies] = React.useState();
  const[selectedMovie, setSelectedMovie] = React.useState('');
  const[enteredTitle, setEnteredTitle] = React.useState('');
  const[enteredReview, setEnteredReview] = React.useState('');
  const[selectedRating, setSelectedRating] = React.useState('');
  const [userID, setUserID] = React.useState(1);
  const [movieID, setMovieID] = React.useState('');

  // error message states
  const[selectedMovieError, setSelectedMovieError] = React.useState('');
  const[enteredTitleError, setEnteredTitleError] = React.useState('');
  const[enteredReviewError, setEnteredReviewError] = React.useState('');
  const[selectedRatingError, setSelectedRatingError] = React.useState('');

  //display movie states
  const[displayMovies, setDisplayMovies] = React.useState(false);
  const[onPageReview, setOnPageReview] = React.useState();

  //confirmation message state
  const[displayConfirmationMessage, setDisplayConfirmationMessage] = React.useState(false);

  // stateful list
  React.useEffect(()=>{
    // make an get request to retrieve all the movies
    initialRender();
  },[])

  const initialRender = async () => {
    try {
      const response = await fetch('/api/getMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addReview = async (data) => {
    try {
      const response = await fetch('/api/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  

  // sets all the states for the given form attributes
  const handleMovieSelection = (movieTitle, movieID) =>{
    setSelectedMovie(movieTitle);
    setMovieID(movieID)
  }
  const handleTitleSelection = (movieTitle) =>{
    setEnteredTitle(movieTitle);
  }
  const handleReviewSelection = (movieReview) => {
    setEnteredReview(movieReview);
  }
  const handleRatingSelection = (rating) => {
    setSelectedRating(rating);
  }

  // handles the submit button
  const submitButtonClick = () =>{
    // for each of the error states
    if(selectedMovie === ''){
      setSelectedMovieError(true);
    }else{
      setSelectedMovieError(false);
    }

    if(enteredTitle === ''){
      setEnteredTitleError(true);
    }else{
      setEnteredTitleError(false);
    }

    if(enteredReview === ''){
      setEnteredReviewError(true);
    }else{
      setEnteredReviewError(false);
    }

    if(selectedRating === ''){
      setSelectedRatingError(true);
    }else{
      setSelectedRatingError(false);
    }

    // check if there are no errors
    if(selectedMovie && enteredReview && enteredTitle && selectedRating){
      //clears existing reviews if there are any
      if(onPageReview != null) setOnPageReview({});
      // create a new object to store all the form states and then sets it to display
      const formItems = {"Movie": selectedMovie, "Title": enteredTitle, "Review": enteredReview, "Rating": selectedRating};
      addReview({...formItems, "userID": userID, "movieID" :movieID });
      setOnPageReview(formItems);
      // clears the state
      setSelectedMovie('');
      setEnteredReview('');
      setEnteredTitle('');
      setSelectedRating('');
      // displays movies
      handleDisplayMovies();
      // displays confirmation message
      handleDisplayConfirmationMessage();
    }
  }

  //displays the movie review
  const handleDisplayMovies = () =>{
    setDisplayMovies(true);
  }

  //displays the confirmation message
  const handleDisplayConfirmationMessage = () =>{
    setDisplayConfirmationMessage(true);
    setTimeout(()=>{
      setDisplayConfirmationMessage(false);
    },5000)
  }

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Typography variant="h3" align="center" sx={{ marginBottom: '20px', marginTop: '100px' }}>
          Review a Movie
        </Typography>
        <MovieSelection errorMessage={selectedMovieError} movies={movies} movieID={movieID} handleMovieSelection={handleMovieSelection} selectedMovie={selectedMovie} />

        <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
          Add a New Review
        </Typography>

        <ReviewTitle errorMessage={enteredTitleError} handleTitleSelection={handleTitleSelection} enteredTitle={enteredTitle} />
        <ReviewBody errorMessage={enteredReviewError} handleReviewSelection={handleReviewSelection} enteredReview={enteredReview} />
        <ReviewRating errorMessage={selectedRatingError} handleRatingSelection={handleRatingSelection} selectedRating={selectedRating} />

        <Button variant="contained" onClick={submitButtonClick} sx={{ marginBottom: '20px' }}>
          Submit
        </Button>

        {displayConfirmationMessage && (
          <Typography variant="p" sx={{ color: 'blue' }}>
            Your Review Has Been Received
          </Typography>
        )}

        <Typography variant="h4" align="center" sx={{ marginBottom: '20px', marginTop: '50px' }}>
          Current Movie Rating
        </Typography>
        {displayMovies &&
          <Box display="flex" flexDirection="column" alignItems="center">
            {Object.entries(onPageReview).map(([key, value]) => (
              <Paper key={key} elevation={3} sx={{ width: '80%', marginBottom: '10px', padding: '10px' }}>
                <Typography variant="p" sx={{ fontWeight: '600' }}>
                  {`${key}: `}
                </Typography>
                <Typography variant="p">
                  {value}
                </Typography>
              </Paper>
            ))}
          </Box>
        }
      </Grid>
    </>
  );
}

export default Review;