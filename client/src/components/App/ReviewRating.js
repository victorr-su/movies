import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';

const ReviewRating = ({handleRatingSelection, errorMessage, selectedRating}) => {

  const handleSelectChange = (event) => {
    handleRatingSelection(event.target.value);
  };
  return (
    <>
    <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
      Add a Rating
    </Typography>
    <FormControl sx = {{ marginBottom: "20px"}}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value= {selectedRating}
        onChange={handleSelectChange}
        row
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    </FormControl>

    {errorMessage && <p style = {{color: "red", marginTop: "-25px"}}>Select the rating</p>}
    </>
  );
}

export default ReviewRating;