import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import  {TextField, Typography } from '@mui/material';

const ReviewTitle = ({handleTitleSelection, errorMessage, enteredTitle}) => {
  
  const handleSelectChange = (event) => {
    handleTitleSelection(event.target.value);
  };
  return (
    <>
      <TextField id="Title" label="Title" variant="outlined"  sx={{ width: '50%', marginBottom: "30px" }} onChange={handleSelectChange} value={enteredTitle}/>
      {errorMessage && <p style = {{color: "red", marginTop: "-25px"}}>Enter your review title </p>}
    </>
  );
}

export default ReviewTitle;