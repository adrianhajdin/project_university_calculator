
import React from 'react';
import PropTypes from 'prop-types';

import { isMobile } from 'react-device-detect';
import { Stepper, Step, StepLabel, MobileStepper } from '@material-ui/core';

const steps = ['Raspodjela bodova za upis', 'Prosjek ocjena', 'Rezultati mature', 'Ukupan broj bodova'];

const stepper = ({ activeStep }) => (
  !isMobile
    ? (
      <Stepper className="paddingTop0" activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )
    : (
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        className="mobileStepper"
      />
    )
);

stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default stepper;
