
import React from 'react';

import { Grid, FormControl, NativeSelect, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { CustomInput } from '..';
import { maturaElectiveOptionNames } from '../../util/constants';

import styles from './styles';

// Polja za upis kriterija izbornih predmeta državne mature
const electiveInputs = ({ props: { evaluationMaturaElectiveInputs2, evaluationMaturaElectiveInputs, evaluationMaturaElective1Name, evaluationMaturaElective1, evaluationMaturaElective2Name, evaluationMaturaElectiveInputs3, evaluationMaturaElective3Name, evaluationMaturaElective3, evaluationMaturaElective2 }, handleChange, classes }) => (
  <Grid container justify="center">
    { evaluationMaturaElectiveInputs
      ? (
        <Grid item xs={12}>
          <FormControl classes={{ root: classes.formControl }}>
            <NativeSelect value={evaluationMaturaElective1Name} onChange={handleChange} input={<Input name="evaluationMaturaElective1Name" />}>
              {maturaElectiveOptionNames.map((option, i) => <option key={i} value={option}>{option}</option>)}
            </NativeSelect>
          </FormControl>
          <CustomInput name="evaluationMaturaElective1" value={evaluationMaturaElective1} onChange={handleChange} percentage />
        </Grid>
      ) : null
    }
    { evaluationMaturaElectiveInputs2
      ? (
        <Grid item xs={12}>
          <FormControl classes={{ root: classes.formControl }}>
            <NativeSelect value={evaluationMaturaElective2Name} onChange={handleChange} input={<Input name="evaluationMaturaElective2Name" />}>
              {maturaElectiveOptionNames.map((option, i) => <option key={i} value={option}>{option}</option>)}
            </NativeSelect>
          </FormControl>
          <CustomInput name="evaluationMaturaElective2" value={evaluationMaturaElective2} onChange={handleChange} percentage />
        </Grid>
      ) : null
    }
    { evaluationMaturaElectiveInputs3
      ? (
        <Grid item xs={12}>
          <FormControl classes={{ root: classes.formControl }}>
            <NativeSelect value={evaluationMaturaElective3Name} onChange={handleChange} input={<Input name="evaluationMaturaElective3Name" />}>
              {maturaElectiveOptionNames.map((option, i) => <option key={i} value={option}>{option}</option>)}
            </NativeSelect>
          </FormControl>
          <CustomInput name="evaluationMaturaElective3" value={evaluationMaturaElective3} onChange={handleChange} percentage />
        </Grid>
      ) : null
    }
  </Grid>
);

electiveInputs.propTypes = {
  props: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(electiveInputs);
