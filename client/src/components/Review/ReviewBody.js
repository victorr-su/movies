import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { TextField } from '@mui/material';


const ReviewBody = ({handleReviewSelection, errorMessage, enteredReview}) => {

  const handleSelectChange = (event) => {
    handleReviewSelection(event.target.value);
  };
  return (
    <>
      <TextField multiline rows={4}id="movieDescription" label="Movie Review" variant="outlined"  sx={{ width: '50%',  marginBottom: "30px"}} onChange={handleSelectChange} value={enteredReview} inputProps={{ maxLength: 200 }}/>
      {errorMessage && <p style = {{color: "red", marginTop: "-25px"}}>Enter your review</p>}
    </>
  );
}

export default ReviewBody;