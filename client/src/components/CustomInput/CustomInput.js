import React from 'react';

import { TextValidator } from 'react-material-ui-form-validator';
import { InputAdornment } from '@material-ui/core';
import { isMobile } from 'react-device-detect';

const Input = ({ percentage, name, label, value, onChange, helperText, autoFocus, required, type }) => {
  let percentageSign;
  let validation;

  // Dodaje znak % na kraj ukoliko je percentage istinit
  if (percentage) {
    percentageSign = {
      InputProps: {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      },
    };
  }

  // Validacija
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
      style={{ width: isMobile ? '60%' : 'initial' }}
      name={name}
      label={label}
      type={type ? 'text' : 'number'}
      value={value}
      onChange={onChange}
      helperText={helperText}
      autoFocus={autoFocus}
      required={required}
      {...validation}
      {...percentageSign}
    />
  );
};

export default Input;
