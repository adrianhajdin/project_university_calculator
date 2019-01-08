import React from 'react';

import { TextValidator } from 'react-material-ui-form-validator';
import { InputAdornment } from '@material-ui/core';

const Input = ({ percentage, name, label, value, onChange, helperText, autoFocus, required }) => {
  let percentageSign;
  let validation;

  if (percentage) {
    percentageSign = {
      InputProps: {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      },
    };
  }

  if (percentage && required) {
    validation = {
      validators: ['required', 'minNumber:0', 'maxNumber:100'],
      errorMessages: ['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100'],
    };
  } else if (required) {
    validation = {
      validators: ['required', 'minNumber:1', 'maxNumber:5'],
      errorMessages: ['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00'],
    };
  }

  return (
    <TextValidator
      name={name}
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      {...percentageSign}
      helperText={helperText}
      autoFocus={autoFocus}
      {...validation}
      required={required}
    />
  );
};

export default Input;
