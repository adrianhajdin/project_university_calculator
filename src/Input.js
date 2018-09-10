import React from 'react';

import { TextValidator } from 'react-material-ui-form-validator';
import { InputAdornment, Grid } from '@material-ui/core';

const Input = (props) => {
  let inputProps;

  if(props.percentage){
    inputProps = {
      InputProps:{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      },
      validators:['required', 'minNumber:0', 'maxNumber:100'],
      errorMessages:['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']
    }
  } else {
    inputProps = {
      validators:['required', 'minNumber:1', 'maxNumber:5'],
      errorMessages:['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00']
    }
  }

  return (
    <Grid item xs={4}>
      <TextValidator
        name={props.name}
        label={props.label}
        type="number"
        value={props.value}
        onChange={props.onChange}
        {...inputProps}
      />
    </Grid>
  )
};

export default Input;