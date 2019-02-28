import React, { Component } from 'react';

// Import vanjskih modula
import { Button, Divider, Grid, Typography, Paper, NativeSelect } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import ReactChartkick, { BarChart } from 'react-chartkick';
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import Chart from 'chart.js';
import axios from 'axios';

// Import komponenti, slika i stilova
import { CustomInput, Stepper, Table, ElectiveInputs, ExtraFields, ChosenInputs } from './components';
import printIcon from './public/printIcon.png';
import logo from './public/calculatorIcon.png';
import styles from './styles';
import './App.css';

// Import pomoćnih funkcija
import {
  calculatePoints,
  calculateMaturaPoints,
  calculatePercentagesAndTotalMaturaPoints,
  calculateTotalGradePoints,
} from './util/helperFunctions';

// Import konstanti
import { initialState } from './util/constants';

// Postavljanje grafa za ukupan broj bodova
ReactChartkick.addAdapter(Chart);

class App extends Component {
  state = initialState;

  // Generiranje PDF-a
  createPdf = () => {
    // Destrukturiranje varijabli iz this.state kako bih ih mogao pozivati samo sa imenom varijable, a ne this.state.imeVarijable
    const { universityName, percentagesTotal, evaluationSchoolGrades, pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3 } = this.state;
    // Stvaranje id-a za PDF datoteku
    const id = uuidv1();
    // Postavlja state završnog stanja kako bi se sve moglo proslijediti serveru
    this.setState({
      totalGradePoints: calculateTotalGradePoints(percentagesTotal, evaluationSchoolGrades),
      totalMaturaPoints: calculatePercentagesAndTotalMaturaPoints(pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3),
      isButtonDisabled: true,
    }, () => {
      // Šalje post request zajedno s trenutnim stanjem
      axios.post('https://testasjdasj.herokuapp.com/create-pdf', { state: this.state, id })
        .then(() => {
          // Nakon što se post request izvrši šalje get request za specifičnim PDF-om
          axios.get(`https://testasjdasj.herokuapp.com/fetch-pdf/${id}`, { responseType: 'blob' })
            .then((res) => {
              // Stvara blob o podataka koji su stigli sa servera (PDF datoteka)
              const blob = new Blob([res.data], { type: 'application/pdf' });

              this.setState({ isButtonDisabled: false });

              // Sprema PDF datoteku
              saveAs(blob, `${universityName}.pdf`);
            });
        });
    });
  }

  // Metoda koja mijenja stanje nakon promjene na inputu
  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  // Metoda koja vraća modal za jedan korak natrag
  handleBack = activeStep => this.setState({ activeStep: activeStep - 1 });

  // Metoda koja osvježi cijelu stranicu
  handleRefresh = () => window.location.reload();

  // Metoda koja dodaje dodatna polja
  addInputs = (field) => {
    if (field === 'evaluationMaturaElective') {
      const { evaluationMaturaElectiveInputs, evaluationMaturaElectiveInputs2 } = this.state;

      this.setState({ evaluationMaturaElectiveInputs: true });

      if (evaluationMaturaElectiveInputs) {
        this.setState({ evaluationMaturaElectiveInputs2: true });
      } if (evaluationMaturaElectiveInputs2) {
        this.setState({ evaluationMaturaElectiveInputs3: true });
      }
    } else {
      const { evaluationExtraFields, evaluationExtraFields2 } = this.state;

      this.setState({ evaluationExtraFields: true });

      if (evaluationExtraFields) {
        this.setState({ evaluationExtraFields2: true });
      } if (evaluationExtraFields2) {
        this.setState({ evaluationExtraFields3: true });
      }
    }
  };

  // Metoda koja postavlja novo stanje na svakom idućem koraku
  handleClick = () => {
    const { activeStep, evaluationExtraField1, evaluationExtraField2, evaluationExtraField3, evaluationMaturaCroatian, evaluationMaturaCroatianLevel, evaluationMaturaElective1, evaluationMaturaElective2, evaluationMaturaElective3, evaluationMaturaEnglish, evaluationMaturaEnglishLevel, evaluationMaturaMathematics, evaluationMaturaMathematicsLevel, percentageExtraField1, percentageExtraField2, percentageExtraField3, percentageFirstGrade, percentageFourthGrade, percentageMaturaCroatian, percentageMaturaElective1, percentageMaturaElective2, percentageMaturaElective3, percentageMaturaEnglish, percentageMaturaMathematics, percentageSecondGrade, percentageThirdGrade } = this.state;

    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        percentagesTotal: calculatePercentagesAndTotalMaturaPoints(percentageFirstGrade, percentageSecondGrade, percentageThirdGrade, percentageFourthGrade),
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        pointsExtraField1: calculatePoints(percentageExtraField1, evaluationExtraField1),
        pointsExtraField2: calculatePoints(percentageExtraField2, evaluationExtraField2),
        pointsExtraField3: calculatePoints(percentageExtraField3, evaluationExtraField3),
        pointsMaturaElective1: calculatePoints(percentageMaturaElective1, evaluationMaturaElective1),
        pointsMaturaElective2: calculatePoints(percentageMaturaElective2, evaluationMaturaElective2),
        pointsMaturaElective3: calculatePoints(percentageMaturaElective3, evaluationMaturaElective3),
        pointsMaturaEnglish: calculateMaturaPoints(percentageMaturaEnglish, evaluationMaturaEnglish, evaluationMaturaEnglishLevel),
        pointsMaturaCroatian: calculateMaturaPoints(percentageMaturaCroatian, evaluationMaturaCroatian, evaluationMaturaCroatianLevel),
        pointsMaturaMathematics: calculateMaturaPoints(percentageMaturaMathematics, evaluationMaturaMathematics, evaluationMaturaMathematicsLevel),
      });
    }

    window.scrollTo(0, 0);
  }

  render() {
    const { activeStep, percentagesTotal, pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3, isButtonDisabled, universityName, evaluationExtraField1, evaluationExtraFields3, evaluationMaturaCroatian, evaluationMaturaCroatianLevel, evaluationMaturaElectiveInputs3, evaluationMaturaEnglish, evaluationMaturaEnglishLevel, evaluationMaturaMathematics, evaluationMaturaMathematicsLevel, evaluationSchoolGrades, percentageFirstGrade, percentageFourthGrade, percentageMaturaCroatian, percentageMaturaEnglish, percentageMaturaMathematics, percentageSecondGrade, percentageThirdGrade } = this.state;
    const { classes } = this.props;

    let dialogContent;
    let buttons;

    // Postavljanje novog sadržaja na dialogContent i buttons nakon promjene koraka
    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom10 }} />
          <Typography classes={{ root: classes.marginBottomMobile }} variant="caption"> Ukoliko niste sigurni koliko vaš fakultet pridaje bodova određenim predmetima, posjetite: <Button classes={{ root: classes.button }} target="_blank" href="https://www.postani-student.hr/Ucilista/Nositelji.aspx" color="primary">Postani Student</Button></Typography>
          <Divider light classes={{ root: classes.dividerMarginBottom20 }} />
          <Typography classes={{ root: classes.marginBottom10 }} variant="title">Podaci o fakultetu</Typography>
          <Typography classes={{ root: classes.caption }} variant="caption">Ovdje upišite naziv smjera i fakulteta koji planirate upisati</Typography>
          <CustomInput type="text" autoFocus label="Naziv fakulteta" name="universityName" onChange={this.handleChange} value={universityName} />
          <Divider light classes={{ root: classes.divider }} />
          <Typography classes={{ root: classes.marginBottom10 }} variant="title">Ocjene iz srednje škole</Typography>
          <Typography classes={{ root: classes.caption }} variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam {isMobile ? null : <br />} određeni fakultet pridaje za prosjek ocjena srednje škole</Typography>
          <CustomInput label="Prosjek svih ocjena" name="evaluationSchoolGrades" onChange={this.handleChange} percentage required value={evaluationSchoolGrades} />
          <Divider light classes={{ root: classes.divider }} />
          <Typography classes={{ root: classes.marginBottom10 }} variant="title">Obvezni dio državne mature</Typography>
          <Typography classes={{ root: classes.caption }} variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam {isMobile ? null : <br />} određeni fakultet pridaje za obvezni dio državne mature</Typography>
          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <CustomInput label="Hrvatski" name="evaluationMaturaCroatian" onChange={this.handleChange} percentage required value={evaluationMaturaCroatian} />
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={4}>
              <CustomInput label="Matematika" name="evaluationMaturaMathematics" onChange={this.handleChange} percentage required value={evaluationMaturaMathematics} />
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={4}>
              <CustomInput label="Engleski jezik" name="evaluationMaturaEnglish" onChange={this.handleChange} percentage required value={evaluationMaturaEnglish} />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} lg={6}>
              <Divider light classes={{ root: classes.divider }} />
              <Typography classes={{ root: classes.marginBottom10 }} variant="title">Izborni dio državne mature</Typography>
              <Typography classes={{ root: classes.caption }} variant="caption" style={{ marginBottom: '0 !important' }}>
                Ovdje upišite postotak od ukupnog broja bodova koji vam određeni {isMobile ? null : <br />} fakultet pridaje za izborni dio državne mature
                <br />
                { !evaluationMaturaElectiveInputs3
                  ? <Button onClick={() => this.addInputs('evaluationMaturaElective')} color="primary">Dodaj izborni predmet</Button>
                  : null
                }
              </Typography>
              <ElectiveInputs props={this.state} handleChange={this.handleChange} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Divider light classes={{ root: classes.divider }} />
              <Typography classes={{ root: classes.marginBottom10 }} variant="title">Dodatne provjere i posebna postignuća</Typography>
              <Typography classes={{ root: classes.caption }} variant="caption" style={{ marginBottom: '0 !important' }}>
                Ovdje upišite postotak od ukupnog broja bodova koji vam određeni {isMobile ? null : <br />} fakultet pridaje za dodatne provjere i posebna postignuća
                <br />
                { !evaluationExtraFields3
                  ? <Button onClick={this.addInputs} color="primary">Dodaj dodatnu provjeru</Button>
                  : null
                }
              </Typography>
              <ExtraFields props={this.state} handleChange={this.handleChange} />
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );

      buttons = <Button type="submit" fullWidth size="large" variant="contained" color="primary">Dalje</Button>;
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom20 }} />
          <Typography classes={{ root: classes.marginBottom10 }} variant="title">Prosjeci ocjena srednje škole</Typography>
          <Typography classes={{ root: classes.caption }} variant="caption">Ovdje upišite prosjeke ocjena koje ste postigli tijekom {isMobile ? null : <br />} četiri razreda srednje škole</Typography>
          <Grid container justify="center">
            <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
              <CustomInput label="1. razred" name="percentageFirstGrade" onChange={this.handleChange} required value={percentageFirstGrade} />
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
              <CustomInput label="2. razred" name="percentageSecondGrade" onChange={this.handleChange} required value={percentageSecondGrade} />
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
              <CustomInput label="3. razred" name="percentageThirdGrade" onChange={this.handleChange} required value={percentageThirdGrade} />
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
              <CustomInput label="4. razred" name="percentageFourthGrade" onChange={this.handleChange} required value={percentageFourthGrade} />
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );

      buttons = (
        <div style={{ display: 'flex' }}>
          <Button style={{ flex: 1 }} onClick={() => this.handleBack(activeStep)} fullWidth size="large" variant="contained">Natrag</Button>
          <Button style={{ flex: 4 }} type="submit" fullWidth size="large" variant="contained" color="primary">Dalje</Button>
        </div>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom20 }} />
          <Typography classes={{ root: classes.marginBottom10 }} variant="title">Rezultati mature {evaluationExtraField1 ? 'i dodatnih provjera' : null}</Typography>
          <Typography classes={{ root: classes.caption }} variant="caption">Ovdje upišite rezultate koje ste postigli na {isMobile ? null : <br />} ispitima državne mature {evaluationExtraField1 ? 'i dodatnim provjerama' : null} te razinu koju planirate položiti</Typography>
          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <CustomInput label="Hrvatski jezik" name="percentageMaturaCroatian" onChange={this.handleChange} percentage required value={percentageMaturaCroatian} />
              <NativeSelect name="evaluationMaturaCroatianLevel" classes={{ root: classes.marginLeft10 }} value={evaluationMaturaCroatianLevel} onChange={this.handleChange}>
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={4}>
              <CustomInput label="Matematika" name="percentageMaturaMathematics" onChange={this.handleChange} percentage required value={percentageMaturaMathematics} />
              <NativeSelect name="evaluationMaturaMathematicsLevel" classes={{ root: classes.marginLeft10 }} value={evaluationMaturaMathematicsLevel} onChange={this.handleChange}>
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
            <Grid className={classes.marginTopMobile} item xs={12} lg={4}>
              <CustomInput label="Engleski jezik" name="percentageMaturaEnglish" onChange={this.handleChange} percentage required value={percentageMaturaEnglish} />
              <NativeSelect name="evaluationMaturaEnglishLevel" classes={{ root: classes.marginLeft10 }} value={evaluationMaturaEnglishLevel} onChange={this.handleChange}>
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
          </Grid>
          <ChosenInputs props={this.state} handleChange={this.handleChange} />
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );

      buttons = (
        <div style={{ display: 'flex' }}>
          <Button style={{ flex: 1 }} onClick={() => this.handleBack(activeStep)} fullWidth size="large" variant="contained">Natrag</Button>
          <Button style={{ flex: 4 }} type="submit" fullWidth size="large" variant="contained" color="primary">Završi</Button>
        </div>
      );
    } else if (activeStep === 3) {
      const totalGradePoints = calculateTotalGradePoints(percentagesTotal, evaluationSchoolGrades);
      const totalMaturaPoints = calculatePercentagesAndTotalMaturaPoints(pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3);

      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom20 }} />
          <Typography classes={{ root: classes.marginBottom10 }} variant="title">Rezultati:</Typography>
          <Divider light classes={{ root: classes.divider }} />
          <Table props={{ ...this.state, totalGradePoints }} />
          <Typography justify="center" classes={{ root: classes.marginTop20 }} variant="title">Ukupan broj bodova: {totalMaturaPoints + totalGradePoints}</Typography>
          <BarChart height="100px" max={1000} data={[['Broj bodova', totalMaturaPoints + totalGradePoints]]} />
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );

      buttons = (
        <div style={{ display: 'flex' }}>
          <Button style={{ flex: 5 }} onClick={this.handleRefresh} fullWidth size="large" variant="contained" color="primary">Na početak</Button>
          <Button onClick={this.createPdf} style={{ flex: 2 }} fullWidth size="large" variant="contained" color="primary" disabled={isButtonDisabled}>{isButtonDisabled ? 'Stvaranje rezultata' : 'Preuzmi rezultate' }
            {isMobile ? null : <img style={{ paddingLeft: '10px' }} height="30" width="30" alt="printIcon" src={printIcon} />}
          </Button>
        </div>
      );
    }

    // Krajnji output, ono što se rendera u browseru, zajedno sa svim vanjskim komponentama
    return (
      <React.Fragment>
        <Grid justify="center" container>
          <Grid item xs={12} sm={9} md={6} lg={8} xl={6}>
            <Paper className={classes.paper} elevation={8}>
              <div className={classes.heading}>
                <Typography classes={{ root: classes.headingTypography }} variant="headline">Kalkulator bodova za upis na fakultet</Typography>
                <img src={logo} className={classes.icon} alt="calculator-icon" />
              </div>
              <ValidatorForm noValidate onSubmit={this.handleClick}>
                {dialogContent}
                <Stepper activeStep={activeStep} />
                {buttons}
              </ValidatorForm>
              <br />
              <Typography className={classes.copyright} variant="caption">
                Copyright 2019 © <a className={classes.anchor} href="https://www.linkedin.com/in/adrian-hajdin">Adrian Hajdin.</a> All Rights Reserved.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
