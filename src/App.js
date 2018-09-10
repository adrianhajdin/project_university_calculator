
import React, { Component } from 'react';
import './App.css';

import TextField from '@material-ui/core/TextField';
import { Button, Paper, Divider, Stepper, Step, StepLabel, InputAdornment, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prosjekSvihRazreda: '',
      prosjekPrviRazred: '',
      prosjekDrugiRazred: '',
      prosjekTreciRazred: '',
      prosjekCetvrtiRazred: '',
      evaluationGrades: '',
      bodoviZaHj: '',
      bodoviZaMat: '',
      bodoviZaEj: '',
      bodoviZaIzb: '',
      postotakMaturaHj: '',
      postotakMaturaMat: '',
      postotakMaturaEj: '',
      postotakMaturaIzb: '',
      evaluationHj: '',
      evaluationMat: '',
      evaluationEj: '',
      evaluationOpt: '',
      activeStep: 0,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    const numberValue = parseFloat(value, 10);

    this.setState({
      [name]: numberValue,
    });
  }

  handleBack = () => {
    window.location.reload()
  }

  handleClick = () => {
    const {
      activeStep,
      prosjekPrviRazred,
      prosjekDrugiRazred,
      prosjekTreciRazred,
      prosjekCetvrtiRazred,
      postotakMaturaHj,
      evaluationHj,
      postotakMaturaEj,
      postotakMaturaMat,
      evaluationEj,
      evaluationMat,
      postotakMaturaIzb,
      evaluationOpt,
    } = this.state;

    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
      console.log(';reach')
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        prosjekSvihRazreda: prosjekPrviRazred + prosjekDrugiRazred + prosjekTreciRazred + prosjekCetvrtiRazred,
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        bodoviZaHj: postotakMaturaHj * evaluationHj * 10 / 100,
        bodoviZaEj: postotakMaturaEj * evaluationEj * 10 / 100,
        bodoviZaMat: postotakMaturaMat * evaluationMat * 10 / 100,
        bodoviZaIzb: postotakMaturaIzb * evaluationOpt * 10 / 100,
      });
    }
  }

  render() {
    const {
      prosjekSvihRazreda,
      prosjekCetvrtiRazred,
      prosjekDrugiRazred,
      prosjekPrviRazred,
      prosjekTreciRazred,
      evaluationGrades,
      postotakMaturaEj,
      postotakMaturaHj,
      postotakMaturaIzb,
      postotakMaturaMat,
      bodoviZaHj,
      bodoviZaEj,
      bodoviZaMat,
      bodoviZaIzb,
      activeStep,
      evaluationHj,
      evaluationEj,
      evaluationMat,
      evaluationOpt,
    } = this.state;

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
            <h3>Vrednovanje za vaš fakultet</h3>
            <h3>Ocjene iz srednje škole</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextValidator
                  name="evaluationGrades"
                  label="Prosjek svih ocjena"
                  type="number"
                  value={evaluationGrades}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
            </Grid>
            <h3>Obvezni dio državne mature</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextValidator
                  name="evaluationHj"
                  label="Hrvatski"
                  type="number"
                  value={evaluationHj}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="evaluationMat"
                  label="Matematika"
                  type="number"
                  value={evaluationMat}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="evaluationEj"
                  label="Engleski jezik"
                  type="number"
                  value={evaluationEj}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
            </Grid>
            <h3>Izborni dio državne mature</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextValidator
                  name="evaluationOpt"
                  label="Izborni predmet"
                  type="number"
                  value={evaluationOpt}
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
            </Grid>

        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
            <h3>Prosjeci sva cetiri razreda</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={3}>
                <TextValidator
                  name="prosjekPrviRazred"
                  label="1. razred"
                  value={prosjekPrviRazred}
                  type="number"
                  onChange={this.handleChange}
                  validators={['required', 'minNumber:1', 'maxNumber:5']}
                  errorMessages={['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00']}
                />
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  name="prosjekDrugiRazred"
                  label="2. razred"
                  value={prosjekDrugiRazred}
                  type="number"
                  onChange={this.handleChange}
                  validators={['required', 'minNumber:1', 'maxNumber:5']}
                  errorMessages={['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00']}
                />
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  name="prosjekTreciRazred"
                  label="3. razred"
                  value={prosjekTreciRazred}
                  type="number"
                  onChange={this.handleChange}
                  validators={['required', 'minNumber:1', 'maxNumber:5']}
                  errorMessages={['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00']}
                />
              </Grid>
              <Grid item xs={3}>
                <TextValidator
                  name="prosjekCetvrtiRazred"
                  label="4. razred"
                  value={prosjekCetvrtiRazred}
                  type="number"
                  onChange={this.handleChange}
                  validators={['required', 'minNumber:1', 'maxNumber:5']}
                  errorMessages={['Ovo polje je obvezno', 'Prosjek ne može biti manji od 1.00', 'Prosjek ne može biti veći od 5.00']}
                />
              </Grid>
            </Grid>

        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
            <h3>Prosjeci s drzavne mature</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextValidator
                  name="postotakMaturaHj"
                  label="Hrvatski jezik"
                  value={postotakMaturaHj}
                  type="number"
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="postotakMaturaMat"
                  label="Matematika"
                  value={postotakMaturaMat}
                  type="number"
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="postotakMaturaEj"
                  label="Engleski jezik"
                  value={postotakMaturaEj}
                  type="number"
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  name="postotakMaturaIzb"
                  label="Izborni predmet"
                  value={postotakMaturaIzb}
                  type="number"
                  onChange={this.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  validators={['required', 'minNumber:0', 'maxNumber:100']}
                  errorMessages={['Ovo polje je obvezno', 'Postotak mora biti veći od 0', 'Postotak ne može biti veći od 100']}
                />
              </Grid>
            </Grid>

        </React.Fragment>
      );
    } else if (activeStep === 3) {
      dialogContent = (
        <React.Fragment>
            <h3>Rezultati</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextField
                  label="Ukupan prosjek"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={(prosjekSvihRazreda / 4).toFixed(2)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Broj bodova od ocjena"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Broj bodova od HJ"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaHj)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Broj bodova od MAT"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaMat)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Broj bodova od EJ"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaEj)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Broj bodova od IZB"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaIzb)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Ukupan broj bodova"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaIzb + bodoviZaEj + bodoviZaHj + bodoviZaMat + Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10))}
                />
              </Grid>
            </Grid>
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        <Paper className="paper">
          <h1>Kalkulator bodova za upis na fakultet</h1>
          <Divider />
          <ValidatorForm name='form' onSubmit={this.handleClick}>
            {dialogContent}
          <Stepper className="stepper" activeStep={activeStep}>
            <Step key={1}>
              <StepLabel>Raspodjela bodova za upis</StepLabel>
            </Step>
            <Step key={2}>
              <StepLabel>Prosjek ocjena</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>Rezultati mature</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>Ukupan broj bodova</StepLabel>
            </Step>
          </Stepper>
          {activeStep !== 3
            ? (
              <Grid container className="container" spacing={16}>
              <Grid item xs={12}>
                <Button type="submit" fullWidth size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
              </Grid>
            </Grid>
            )
            : (
              <Grid container className="container" spacing={16}>
                <Grid item xs={12}>
                  <Button onClick={this.handleBack} fullWidth size="large" variant="contained" color="primary">Na početak</Button>
                </Grid>
              </Grid>
            ) }
            </ValidatorForm>
        </Paper>
      </div>
    );
  }
}

export default App;
