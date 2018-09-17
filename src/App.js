
import React, { Component } from 'react';

import './App.css';
import PropTypes from 'prop-types';
import { Button, Divider, Grid, Icon, Tooltip, Typography, Paper } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';
import { withStyles } from '@material-ui/core/styles';

import { Input, Stepper, Table } from './components';
import styles from './styles';
import logo from './public/calculator-icon.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      evaluationMaturaCroatian: '',
      evaluationMaturaElective: '',
      evaluationMaturaEnglish: '',
      evaluationMaturaMathematics: '',
      evaluationSchoolGrades: '',
      percentageFirstGrade: '',
      percentageFourthGrade: '',
      percentageMaturaCroatian: '',
      percentageMaturaElective: '',
      percentageMaturaEnglish: '',
      percentageMaturaMathematics: '',
      percentageSecondGrade: '',
      percentageThirdGrade: '',
      percentagesTotal: '',
      pointsMaturaCroatian: '',
      pointsMaturaElective: '',
      pointsMaturaEnglish: '',
      pointsMaturaMathematics: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleBack = () => {
    window.location.reload();
  }

  handleClick = () => {
    const {
      activeStep,
      evaluationMaturaCroatian,
      evaluationMaturaElective,
      evaluationMaturaEnglish,
      evaluationMaturaMathematics,
      percentageFirstGrade,
      percentageFourthGrade,
      percentageMaturaCroatian,
      percentageMaturaElective,
      percentageMaturaEnglish,
      percentageMaturaMathematics,
      percentageSecondGrade,
      percentageThirdGrade,
    } = this.state;

    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
      window.scrollTo(0, 0);
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        percentagesTotal: parseFloat(percentageFirstGrade, 10) + parseFloat(percentageSecondGrade, 10) + parseFloat(percentageThirdGrade, 10) + parseFloat(percentageFourthGrade, 10),
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        pointsMaturaCroatian: percentageMaturaCroatian * evaluationMaturaCroatian / 10,
        pointsMaturaElective: percentageMaturaElective * evaluationMaturaElective / 10,
        pointsMaturaEnglish: percentageMaturaEnglish * evaluationMaturaEnglish / 10,
        pointsMaturaMathematics: percentageMaturaMathematics * evaluationMaturaMathematics / 10,
      });
    }
  }

  render() {
    const {
      activeStep,
      evaluationMaturaCroatian,
      evaluationMaturaElective,
      evaluationMaturaEnglish,
      evaluationMaturaMathematics,
      evaluationSchoolGrades,
      percentageFirstGrade,
      percentageFourthGrade,
      percentageMaturaCroatian,
      percentageMaturaElective,
      percentageMaturaEnglish,
      percentageMaturaMathematics,
      percentageSecondGrade,
      percentageThirdGrade,
      percentagesTotal,
      pointsMaturaCroatian,
      pointsMaturaElective,
      pointsMaturaEnglish,
      pointsMaturaMathematics,
    } = this.state;
    const { classes } = this.props;

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">
            Ocjene iz srednje škole
            {!isMobile ? (
              <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za prosjek ocjena srednje škole">
                <Icon classes={{ root: classes.tooltipIcon }}>info_outlined</Icon>
              </Tooltip>
            ) : null}
          </Typography>
          {isMobile ? <Typography classes={{ root: classes.mobileTooltip }} variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za prosjek ocjena srednje škole</Typography> : null}
          <Input
            name="evaluationSchoolGrades"
            label="Prosjek svih ocjena"
            value={evaluationSchoolGrades}
            onChange={this.handleChange}
            percentage
            required
          />
          <Divider light classes={{ root: classes.divider }} />
          <Typography className="typography" variant="title">
            Obvezni dio državne mature
            {!isMobile ? (
              <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za obvezni dio drzavne mature">
                <Icon classes={{ root: classes.tooltipIcon }}>info_outlined</Icon>
              </Tooltip>
            ) : null}
          </Typography>
          {isMobile ? <Typography classes={{ root: classes.mobileTooltip }} variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za obvezni dio drzavne mature</Typography> : null}
          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationMaturaCroatian"
                label="Hrvatski"
                value={evaluationMaturaCroatian}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationMaturaMathematics"
                label="Matematika"
                value={evaluationMaturaMathematics}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationMaturaEnglish"
                label="Engleski jezik"
                value={evaluationMaturaEnglish}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
          <Typography className="typography" variant="title">
            Izborni dio državne mature
            {!isMobile ? (
              <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za izborni dio drzavne mature">
                <Icon classes={{ root: classes.tooltipIcon }}>info_outlined</Icon>
              </Tooltip>
            ) : null}
          </Typography>
          {isMobile ? <Typography classes={{ root: classes.mobileTooltip }} variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za izborni dio drzavne mature</Typography> : null}
          <Input
            name="evaluationMaturaElective"
            label="Izborni predmet"
            value={evaluationMaturaElective}
            onChange={this.handleChange}
            percentage
          />
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">
            Prosjeci sva cetiri razreda {!isMobile ? <Tooltip title="Ovdje upišite prosjeke ocjena od 1. do 4. razreda srednje skole"><Icon classes={{ root: classes.tooltipIcon }}>info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography classes={{ root: classes.mobileTooltip }} variant="caption">Ovdje upišite prosjeke ocjena od 1. do 4. razreda srednje skole</Typography> : null }
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                label="1. razred"
                name="percentageFirstGrade"
                onChange={this.handleChange}
                required
                value={percentageFirstGrade}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="2. razred"
                name="percentageSecondGrade"
                onChange={this.handleChange}
                required
                value={percentageSecondGrade}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="3. razred"
                name="percentageThirdGrade"
                onChange={this.handleChange}
                required
                value={percentageThirdGrade}
              />
            </Grid>
            <Grid item sm={12} lg={3}>
              <Input
                label="4. razred"
                name="percentageFourthGrade"
                onChange={this.handleChange}
                required
                value={percentageFourthGrade}
              />
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">
            Rezultati mature {!isMobile ? <Tooltip title="Ovdje upišite postotke pojedinih predmeta s mature"><Icon classes={{ root: classes.tooltipIcon }}>info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography classes={{ root: classes.mobileTooltip }} variant="caption">Ovdje upišite postotke pojedinih predmeta s mature</Typography> : null }
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                label="Hrvatski jezik"
                name="percentageMaturaCroatian"
                onChange={this.handleChange}
                percentage
                required
                value={percentageMaturaCroatian}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="Matematika"
                name="percentageMaturaMathematics"
                onChange={this.handleChange}
                percentage
                required
                value={percentageMaturaMathematics}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="Engleski jezik"
                name="percentageMaturaEnglish"
                onChange={this.handleChange}
                percentage
                required
                value={percentageMaturaEnglish}
              />
            </Grid>
            { evaluationMaturaElective !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <Input
                    label="Izborni predmet"
                    name="percentageMaturaElective"
                    onChange={this.handleChange}
                    percentage
                    required
                    value={percentageMaturaElective}
                  />
                </Grid>
              ) : null
            }
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      const totalMaturaPoints = pointsMaturaEnglish + pointsMaturaCroatian + pointsMaturaElective + pointsMaturaMathematics;
      const totalGradePoints = Math.round((percentagesTotal / 4).toFixed(2) / 5 * evaluationSchoolGrades * 10);

      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Rezultati</Typography>
          <Table props={{ evaluationMaturaElective, percentagesTotal, totalGradePoints, pointsMaturaCroatian, pointsMaturaMathematics, pointsMaturaEnglish, pointsMaturaElective }} />
          <Typography justify="center" className="result" variant="title">Ukupan broj bodova: {totalMaturaPoints + totalGradePoints}</Typography>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    }

    return (
      <div id="app" className="App">
        <Paper className="paper" elevation={8}>
          <div className="heading">
            <Typography
              style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}
              variant="headline"
            >Kalkulator bodova za upis na fakultet
            </Typography>
            <img className="icon" src={logo} alt="calculator-icon" height="64" width="64" />
          </div>
          <ValidatorForm noValidate onSubmit={this.handleClick}>
            {dialogContent}
            <Stepper activeStep={activeStep} />
            { activeStep === 3
              ? <Button onClick={this.handleBack} fullWidth size="large" variant="contained" color="primary">Na početak</Button>
              : <Button type="submit" fullWidth size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
            }
          </ValidatorForm>
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
