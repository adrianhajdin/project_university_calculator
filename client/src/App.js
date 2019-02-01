import React, { Component } from 'react';

// Import vanjskih modula
import { Button, Divider, Grid, Typography, Paper, NativeSelect, FormControl, Input } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import ReactChartkick, { BarChart } from 'react-chartkick';
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import axios from 'axios';

// Import komponenti, slika i stilova
import { CustomInput, Stepper, Table } from './components';
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
import {
  initialState,
  maturaElectiveOptionNames,
} from './util/constants';

// Postavljanje grafa za ukupan broj bodova
ReactChartkick.addAdapter(Chart);

class App extends Component {
  state = initialState;

  // Generiranje PDF-a
  createPdf = () => {
    const { universityName, percentagesTotal, evaluationSchoolGrades, pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3 } = this.state;

    // Postavlja state završnog stanja kako bi se sve moglo proslijediti serveru
    this.setState({
      totalGradePoints: calculateTotalGradePoints(percentagesTotal, evaluationSchoolGrades),
      totalMaturaPoints: calculatePercentagesAndTotalMaturaPoints(pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3),
      isButtonDisabled: true,
    }, () => {
      // Šalje post request zajedno sa trenutnim stanjem
      axios.post('/create-pdf', this.state)
        .then(() => {
          // Nakon što se post request izvrši šalje get request
          axios.get('fetch-pdf', { responseType: 'blob' })
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
    const { evaluationMaturaElective1Name, evaluationMaturaElective2Name, evaluationMaturaElective3Name, activeStep, percentagesTotal, pointsMaturaEnglish, pointsMaturaCroatian, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3, pointsMaturaMathematics, pointsExtraField1, pointsExtraField2, pointsExtraField3, isButtonDisabled, universityName, evaluationExtraField1, evaluationExtraField2, evaluationExtraField3, evaluationExtraFields, evaluationExtraFields2, evaluationExtraFields3, evaluationMaturaCroatian, evaluationMaturaCroatianLevel, evaluationMaturaElective1, evaluationMaturaElective2, evaluationMaturaElective3, evaluationMaturaElectiveInputs, evaluationMaturaElectiveInputs2, evaluationMaturaElectiveInputs3, evaluationMaturaEnglish, evaluationMaturaEnglishLevel, evaluationMaturaMathematics, evaluationMaturaMathematicsLevel, evaluationSchoolGrades, percentageExtraField1, percentageExtraField2, percentageExtraField3, percentageFirstGrade, percentageFourthGrade, percentageMaturaCroatian, percentageMaturaElective1, percentageMaturaElective2, percentageMaturaElective3, percentageMaturaEnglish, percentageMaturaMathematics, percentageSecondGrade, percentageThirdGrade } = this.state;
    const { classes } = this.props;

    let dialogContent;
    let buttons;
    // Postavljanje novog sadržaja na dialogContent nakon promjene koraka
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
              <Grid container justify="center">
                { evaluationMaturaElectiveInputs
                  ? (
                    <Grid item xs={12}>
                      <FormControl classes={{ root: classes.formControl }}>
                        <NativeSelect value={evaluationMaturaElective1Name} onChange={this.handleChange} input={<Input name="evaluationMaturaElective1Name" />}>
                          {maturaElectiveOptionNames.map((option, i) => <option key={i} value={option}>{option}</option>)}
                        </NativeSelect>
                      </FormControl>
                      <CustomInput name="evaluationMaturaElective1" value={evaluationMaturaElective1} onChange={this.handleChange} percentage />
                    </Grid>
                  ) : null
                }
                { evaluationMaturaElectiveInputs2
                  ? (
                    <Grid item xs={12}>
                      <FormControl classes={{ root: classes.formControl }}>
                        <NativeSelect value={evaluationMaturaElective2Name} onChange={this.handleChange} input={<Input name="evaluationMaturaElective2Name" />}>
                          {maturaElectiveOptionNames.map((option, i) => <option key={i} value={option}>{option}</option>)}
                        </NativeSelect>
                      </FormControl>
                      <CustomInput name="evaluationMaturaElective2" value={evaluationMaturaElective2} onChange={this.handleChange} percentage />
                    </Grid>
                  ) : null
                }
                { evaluationMaturaElectiveInputs3
                  ? (
                    <Grid item xs={12}>
                      <FormControl classes={{ root: classes.formControl }}>
                        <NativeSelect value={evaluationMaturaElective3Name} onChange={this.handleChange} input={<Input name="evaluationMaturaElective3Name" />}>
                          {maturaElectiveOptionNames.map((option, i) => <option key={i} value={option}>{option}</option>)}
                        </NativeSelect>
                      </FormControl>
                      <CustomInput name="evaluationMaturaElective3" value={evaluationMaturaElective3} onChange={this.handleChange} percentage />
                    </Grid>
                  ) : null
                }
              </Grid>
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
              <Grid className={classes.marginTop5} container justify="center">
                { evaluationExtraFields
                  ? (
                    <Grid key={1} item xs={12}>
                      <CustomInput name="evaluationExtraField1" label="1. Dodatno polje" value={evaluationExtraField1} onChange={this.handleChange} percentage />
                    </Grid>
                  ) : null
                }
                { evaluationExtraFields2
                  ? (
                    <Grid className={classes.marginTop5} key={2} item xs={12}>
                      <CustomInput name="evaluationExtraField2" label="2. Dodatno polje" value={evaluationExtraField2} onChange={this.handleChange} percentage />
                    </Grid>
                  ) : null
                }
                { evaluationExtraFields3
                  ? (
                    <Grid className={classes.marginTop5} key={3} item xs={12}>
                      <CustomInput name="evaluationExtraField3" label="3. Dodatno polje" value={evaluationExtraField3} onChange={this.handleChange} percentage />
                    </Grid>
                  ) : null
                }
              </Grid>
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
          {evaluationMaturaElective1 ? <br /> : null}
          <Grid container justify="center">
            { evaluationMaturaElective1 !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <CustomInput label={evaluationMaturaElective1Name} name="percentageMaturaElective1" onChange={this.handleChange} percentage required value={percentageMaturaElective1} />
                </Grid>
              ) : null
            }
            { evaluationMaturaElective2 !== ''
              ? (
                <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
                  <CustomInput label={evaluationMaturaElective2Name} name="percentageMaturaElective2" onChange={this.handleChange} percentage required value={percentageMaturaElective2} />
                </Grid>
              ) : null
            }
            { evaluationMaturaElective3 !== ''
              ? (
                <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
                  <CustomInput label={evaluationMaturaElective3Name} name="percentageMaturaElective3" onChange={this.handleChange} percentage required value={percentageMaturaElective3} />
                </Grid>
              ) : null
            }
          </Grid>
          {evaluationExtraField1 ? <br /> : null}
          <Grid container justify="center">
            { evaluationExtraField1 !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <CustomInput label="1. Dodatno polje" name="percentageExtraField1" onChange={this.handleChange} percentage required value={percentageExtraField1} />
                </Grid>
              ) : null
            }
            { evaluationExtraField2 !== ''
              ? (
                <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
                  <CustomInput label="2. Dodatno polje" name="percentageExtraField2" onChange={this.handleChange} percentage required value={percentageExtraField2} />
                </Grid>
              ) : null
            }
            { evaluationExtraField3 !== ''
              ? (
                <Grid className={classes.marginTopMobile} item xs={12} lg={3}>
                  <CustomInput label="3. Dodatno polje" name="percentageExtraField3" onChange={this.handleChange} percentage required value={percentageExtraField3} />
                </Grid>
              ) : null
            }
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );

      buttons = (
        <div style={{ display: 'flex' }}>
          <Button style={{ flex: 1 }} onClick={this.handleBack} fullWidth size="large" variant="contained">Natrag</Button>
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
          <Button onClick={this.createPdf} style={{ flex: 2 }} fullWidth size="large" variant="contained" color="primary" disabled={isButtonDisabled}>{isButtonDisabled ? 'Stvaranje rezultata' : 'Preuzmi rezultate' } <img style={{ paddingLeft: '10px' }} height="30" width="30" alt="printIcon" src={printIcon} /></Button>
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
                Copyright 2018 © <a className={classes.anchor} href="https://www.linkedin.com/in/adrian-hajdin">Adrian Hajdin.</a> All Rights Reserved.
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
