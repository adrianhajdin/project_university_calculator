
import React, { Component } from 'react';

import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';

import './App.css';
import PropTypes from 'prop-types';
import { Button, Divider, Grid, Icon, Tooltip, Typography, Paper, NativeSelect } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';
import { withStyles } from '@material-ui/core/styles';

import { Input, Stepper, Table } from './components';
import styles from './styles';
import logo from './public/calculator-icon.png';

ReactChartkick.addAdapter(Chart);

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
      evaluationMaturaCroatianLevel: 'A',
      evaluationMaturaEnglishLevel: 'A',
      evaluationMaturaMathematicsLevel: 'A',
    };
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  handleSelectChange = ({ target: { value, name } }) => this.setState({ [name]: value });

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
      evaluationMaturaCroatianLevel, evaluationMaturaEnglishLevel, evaluationMaturaMathematicsLevel,
    } = this.state;

    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        percentagesTotal: parseFloat(percentageFirstGrade, 10) + parseFloat(percentageSecondGrade, 10) + parseFloat(percentageThirdGrade, 10) + parseFloat(percentageFourthGrade, 10),
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        pointsMaturaCroatian: Math.round((percentageMaturaCroatian * (evaluationMaturaCroatianLevel === 'A' ? 1.6 : 1) / 160) * evaluationMaturaCroatian * 10),
        pointsMaturaEnglish: Math.round((percentageMaturaEnglish * (evaluationMaturaEnglishLevel === 'A' ? 1.6 : 1) / 160) * evaluationMaturaEnglish * 10),
        pointsMaturaMathematics: Math.round((percentageMaturaMathematics * (evaluationMaturaMathematicsLevel === 'A' ? 1.6 : 1) / 160) * evaluationMaturaMathematics * 10),
        pointsMaturaElective: Math.round(percentageMaturaElective * evaluationMaturaElective / 10),
      });
    }

    window.scrollTo(0, 0);
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
      evaluationMaturaCroatianLevel,
      evaluationMaturaEnglishLevel,
      evaluationMaturaMathematicsLevel,
    } = this.state;
    const { classes } = this.props;

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Ocjene iz srednje škole</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam {isMobile ? null : <br />} određeni fakultet pridaje za prosjek ocjena srednje škole</Typography>
          <Input
            autoFocus
            label="Prosjek svih ocjena"
            name="evaluationSchoolGrades"
            onChange={this.handleChange}
            percentage
            required
            value={evaluationSchoolGrades}
          />
          <Divider light classes={{ root: classes.divider }} />
          <Typography className="typography" variant="title">Obvezni dio državne mature</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam {isMobile ? null : <br />} određeni fakultet pridaje za obvezni dio drzavne mature</Typography>
          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <Input
                label="Hrvatski"
                name="evaluationMaturaCroatian"
                onChange={this.handleChange}
                percentage
                required
                value={evaluationMaturaCroatian}
              />
              <NativeSelect
                name="evaluationMaturaCroatianLevel"
                className="marginLeft10"
                value={evaluationMaturaCroatianLevel}
                onChange={this.handleSelectChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                label="Matematika"
                name="evaluationMaturaMathematics"
                onChange={this.handleChange}
                percentage
                required
                value={evaluationMaturaMathematics}
              />
              <NativeSelect
                name="evaluationMaturaMathematicsLevel"
                className="marginLeft10"
                value={evaluationMaturaMathematicsLevel}
                onChange={this.handleSelectChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                label="Engleski jezik"
                name="evaluationMaturaEnglish"
                onChange={this.handleChange}
                percentage
                required
                value={evaluationMaturaEnglish}
              />
              <NativeSelect
                name="evaluationMaturaEnglishLevel"
                className="marginLeft10"
                value={evaluationMaturaEnglishLevel}
                onChange={this.handleNativeSelectChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
          <Typography className="typography" variant="title">Izborni dio državne mature</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni {isMobile ? null : <br />} fakultet pridaje za izborni dio drzavne mature</Typography>
          <Grid container justify="center">
            <Input
              name="evaluationMaturaElective"
              label="Izborni predmet"
              value={evaluationMaturaElective}
              onChange={this.handleChange}
              percentage
            />
          </Grid>
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
            <Grid item xs={12} lg={3}>
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
      const totalGradePoints = Math.round((percentagesTotal / 4).toFixed(2) / 5 * evaluationSchoolGrades * 10);
      const totalMaturaPoints = pointsMaturaEnglish + pointsMaturaCroatian + pointsMaturaElective + pointsMaturaMathematics;

      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Rezultati</Typography>
          <Table props={{ evaluationMaturaElective, percentagesTotal, totalGradePoints, pointsMaturaCroatian, pointsMaturaMathematics, pointsMaturaEnglish, pointsMaturaElective }} />
          <BarChart height="100px" max={1000} data={[['Broj bodova', totalMaturaPoints + totalGradePoints]]} />
          {/* <Typography justify="center" className="result" variant="title">Ukupan broj bodova: {totalMaturaPoints + totalGradePoints}</Typography> */}
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    }

    return (
      <div id="app" className="App">
        <Grid justify="center" container>
          <Grid item xs={12} sm={8} md={6} lg={8} xl={6}>
            <Paper className="paper" elevation={8}>
              <div className="heading">
                <Typography className="headingTypography" variant="headline">Kalkulator bodova za upis na fakultet</Typography>
                <img className="icon" src={logo} alt="calculator-icon" height="85" width="85" />
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
