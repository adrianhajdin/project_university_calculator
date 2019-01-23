
import React from 'react';

import { Stepper, Step, StepLabel, MobileStepper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';

import styles from './styles/styles';

const steps = ['Raspodjela bodova za upis', 'Prosjek ocjena', 'Rezultati mature', 'Ukupan broj bodova'];

const stepper = ({ activeStep, classes }) => (
  !isMobile
    ? (
      <Stepper classes={{ root: classes.root }} activeStep={activeStep}>
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
        classes={{ root: classes.mobileStepper }}
      />
    )
);

stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(stepper);
