
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';
import { CustomInput } from '..';

// Polja za upis rezultata koja se prikazuju samo ako su odabrana na početku
const chosenInputs = ({ props: { evaluationExtraField1, evaluationExtraField2, evaluationExtraField3, evaluationMaturaElective1, evaluationMaturaElective1Name, percentageMaturaElective1, evaluationMaturaElective2, evaluationMaturaElective2Name, percentageMaturaElective2, evaluationMaturaElective3, evaluationMaturaElective3Name, percentageMaturaElective3, percentageExtraField1, percentageExtraField2, percentageExtraField3 }, handleChange, classes }) => (
  <React.Fragment>
    {evaluationMaturaElective1 ? <br /> : null}
    <Grid container justify="center">
      { evaluationMaturaElective1 !== ''
        ? (
          <Grid item xs={12} lg={3}>
            <CustomInput label={evaluationMaturaElective1Name} name="percentageMaturaElective1" onChange={handleChange} percentage required value={percentageMaturaElective1} />
          </Grid>
        ) : null
            }
      { evaluationMaturaElective2 !== ''
        ? (
          <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
            <CustomInput label={evaluationMaturaElective2Name} name="percentageMaturaElective2" onChange={handleChange} percentage required value={percentageMaturaElective2} />
          </Grid>
        ) : null
            }
      { evaluationMaturaElective3 !== ''
        ? (
          <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
            <CustomInput label={evaluationMaturaElective3Name} name="percentageMaturaElective3" onChange={handleChange} percentage required value={percentageMaturaElective3} />
          </Grid>
        ) : null
            }
    </Grid>
    {evaluationExtraField1 ? <br /> : null}
    <Grid container justify="center">
      { evaluationExtraField1 !== ''
        ? (
          <Grid item xs={12} lg={3}>
            <CustomInput label="1. Dodatno polje" name="percentageExtraField1" onChange={handleChange} percentage required value={percentageExtraField1} />
          </Grid>
        ) : null
            }
      { evaluationExtraField2 !== ''
        ? (
          <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
            <CustomInput label="2. Dodatno polje" name="percentageExtraField2" onChange={handleChange} percentage required value={percentageExtraField2} />
          </Grid>
        ) : null
            }
      { evaluationExtraField3 !== ''
        ? (
          <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
            <CustomInput label="3. Dodatno polje" name="percentageExtraField3" onChange={handleChange} percentage required value={percentageExtraField3} />
          </Grid>
        ) : null
            }
    </Grid>
  </React.Fragment>
);

chosenInputs.propTypes = {
  props: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(chosenInputs);
