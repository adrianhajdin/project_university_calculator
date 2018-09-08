
import React, { Component } from 'react';
import './App.css';

import TextField from '@material-ui/core/TextField';
import { Button, Paper, Divider, Stepper, Step, StepLabel, InputAdornment, Grid } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prosjekSvihRazreda: 0,
      prosjekPrviRazred: 0,
      prosjekDrugiRazred: 0,
      prosjekTreciRazred: 0,
      prosjekCetvrtiRazred: 0,
      evaluationGrades: 0,
      bodoviZaHj: 0,
      bodoviZaMat: 0,
      bodoviZaEj: 0,
      bodoviZaIzb: 0,
      postotakMaturaHj: 0,
      postotakMaturaMat: 0,
      postotakMaturaEj: 0,
      postotakMaturaIzb: 0,
      activeStep: 0,
      errorText: 'Error',
      error: false,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    const numberValue = parseFloat(value, 10);

    this.setState({ [event.target.name]: numberValue });
  }

  handleBack = () => {
    this.setState({ activeStep: 0 });
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
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        prosjekSvihRazreda: prosjekPrviRazred + prosjekDrugiRazred + prosjekTreciRazred + prosjekCetvrtiRazred,
      });
      document.forms.prosjeci.reset();
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
    const { prosjekSvihRazreda, evaluationGrades, bodoviZaHj, bodoviZaEj, bodoviZaMat, bodoviZaIzb, activeStep, errorText, error } = this.state;

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <h3>Vrednovanje za vas fakultet</h3>
          <form autoComplete="off" onSubmit={this.handleSend}>
            <h3>Ocjene iz srednje škole</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextField
                  name="evaluationGrades"
                  label="Prosjek svih ocjena"
                  error={error}
                  type="number"
                  required
                  helperText={error ? errorText : null}
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <h3>Obvezni dio državne mature</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextField
                  name="evaluationHj"
                  label="Hrvatski jezik"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="evaluationMat"
                  label="Matematika"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="evaluationEj"
                  label="Engleski jezik"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <h3>Izborni dio državne mature</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextField
                  name="evaluationOpt"
                  label="Izborni predmet"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <form name="prosjeci" autoComplete="off" onSubmit={this.handleSend}>
            <h3>Prosjeci sva cetiri razreda</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={3}>
                <TextField
                  name="prosjekPrviRazred"
                  label="1. razred"
                  type="number"
                  onChange={event => this.handleChange(event)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="prosjekDrugiRazred"
                  label="2. razred"
                  type="number"
                  onChange={event => this.handleChange(event)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="prosjekTreciRazred"
                  label="3. razred"
                  type="number"
                  onChange={event => this.handleChange(event)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="prosjekCetvrtiRazred"
                  label="4. razred"
                  type="number"
                  onChange={event => this.handleChange(event)}
                />
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <form autoComplete="off" onSubmit={this.handleSend}>
            <h3>Prosjeci s drzavne mature</h3>
            <Grid container className="container" spacing={16}>
              <Grid item xs={4}>
                <TextField
                  name="postotakMaturaHj"
                  label="Hrvatski jezik"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="postotakMaturaMat"
                  label="Matematika"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="postotakMaturaEj"
                  label="Engleski jezik"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="postotakMaturaIzb"
                  label="Izborni predmet"
                  type="number"
                  onChange={event => this.handleChange(event)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      dialogContent = (
        <React.Fragment>
          <form autoComplete="off" onSubmit={this.handleSend}>
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
          </form>
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        <Paper className="paper">
          <h1>Kalkulator bodova za upis na fakultet</h1>
          <Divider />
          {dialogContent}
          <Divider />
          <Stepper activeStep={activeStep}>
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
          {activeStep !== 3 ? (
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} container className="container" spacing={16}>
              <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={12}>
                <Button onClick={this.handleClick} style={{ width: '100%' }} size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
              </Grid>
            </Grid>
          ) : (
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} container className="container" spacing={16}>
              <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={12}>
                <Button onClick={this.handleBack} style={{ width: '100%' }} size="large" variant="contained" color="primary">Na pocetak</Button>
              </Grid>
            </Grid>
          )}
        </Paper>
      </div>
    );
  }
}

export default App;
