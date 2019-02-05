
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';
import { CustomInput } from '..';

// Polja za upis kriterija dodatnih provjera
const extraFields = ({ props: { evaluationExtraFields, evaluationExtraField1, evaluationExtraFields2, evaluationExtraField2, evaluationExtraFields3, evaluationExtraField3 }, handleChange, classes }) => (
  <Grid className={classes.marginTop5} container justify="center">
    { evaluationExtraFields
      ? (
        <Grid key={1} item xs={12}>
          <CustomInput name="evaluationExtraField1" label="1. Dodatno polje" value={evaluationExtraField1} onChange={handleChange} percentage />
        </Grid>
      ) : null
    }
    { evaluationExtraFields2
      ? (
        <Grid className={classes.marginTop5} key={2} item xs={12}>
          <CustomInput name="evaluationExtraField2" label="2. Dodatno polje" value={evaluationExtraField2} onChange={handleChange} percentage />
        </Grid>
      ) : null
    }
    { evaluationExtraFields3
      ? (
        <Grid className={classes.marginTop5} key={3} item xs={12}>
          <CustomInput name="evaluationExtraField3" label="3. Dodatno polje" value={evaluationExtraField3} onChange={handleChange} percentage />
        </Grid>
      ) : null
    }
  </Grid>
);

extraFields.propTypes = {
  props: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(extraFields);
