import React from 'react';

import { TextValidator } from 'react-material-ui-form-validator';
import { InputAdornment } from '@material-ui/core';

const Input = (props) => {
  const { percentage, name, label, value, onChange, helperText, autoFocus, notRequired } = props;

  let percentageSign;
  let validation;

  if (percentage) {
    percentageSign = {
      InputProps: {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      },
    };
  }

  if (percentage) {
    validation = {
      validators: ['required', 'minNumber:0', 'maxNumber:100'],
      errorMessages: ['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100'],
    };
  } else {
    validation = {
      validators: ['required', 'minNumber:1', 'maxNumber:5'],
      errorMessages: ['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00'],
    };
  }

  if (notRequired) {
    validation = null;
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
    />
  );
};

export default Input;
