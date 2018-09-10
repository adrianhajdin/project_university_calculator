
import React, { Component } from 'react';
import './App.css';

import TextField from '@material-ui/core/TextField';
import { Button, Paper, Divider, Stepper, Step, StepLabel, Grid } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Input  from './Input'

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
                <Input
                  name="evaluationGrades"
                  label="Prosjek svih ocjena"
                  value={evaluationGrades}
                  onChange={this.handleChange}
                  percentage
                />
              </Grid>
              <h3>Obvezni dio državne mature</h3>
            <Grid container className="container" spacing={16}>
                <Input
                  name="evaluationHj"
                  label="Hrvatski"
                  value={evaluationHj}
                  onChange={this.handleChange}
                  percentage
                />
                <Input
                  name="evaluationMat"
                  label="Matematika"
                  value={evaluationMat}
                  onChange={this.handleChange}
                  percentage
                />
                <Input
                  name="evaluationEj"
                  label="Engleski jezik"
                  value={evaluationEj}
                  onChange={this.handleChange}
                  percentage
                />
              </Grid>
            <h3>Izborni dio državne mature</h3>
            <Grid container className="container" spacing={16}>
                <Input
                  name="evaluationOpt"
                  label="Izborni predmet"
                  value={evaluationOpt}
                  onChange={this.handleChange}
                  percentage
                />
                </Grid>
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
            <h3>Prosjeci sva četiri razreda</h3>
            <Grid container className="container" spacing={16}>
                <Input
                  name="prosjekPrviRazred"
                  label="1. razred"
                  value={prosjekPrviRazred}
                  onChange={this.handleChange}
                />
                <Input
                  name="prosjekDrugiRazred"
                  label="2. razred"
                  value={prosjekDrugiRazred}
                  onChange={this.handleChange}
                />
                <Input
                  name="prosjekTreciRazred"
                  label="3. razred"
                  value={prosjekTreciRazred}
                  onChange={this.handleChange}
                />
                <Input
                  name="prosjekCetvrtiRazred"
                  label="4. razred"
                  value={prosjekCetvrtiRazred}
                  onChange={this.handleChange}
                />
              </Grid>
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
            <h3>Prosjeci s državne mature</h3>
            <Grid container className="container" spacing={16}>
                <Input
                  name="postotakMaturaHj"
                  label="Hrvatski jezik"
                  value={postotakMaturaHj}
                  onChange={this.handleChange}
                  percentage
                />
                <Input
                  name="postotakMaturaMat"
                  label="Matematika"
                  value={postotakMaturaMat}
                  onChange={this.handleChange}
                  percentage
                />
                <Input
                  name="postotakMaturaEj"
                  label="Engleski jezik"
                  value={postotakMaturaEj}
                  onChange={this.handleChange}
                  percentage
                />
                <Input
                  name="postotakMaturaIzb"
                  label="Izborni predmet"
                  value={postotakMaturaIzb}
                  onChange={this.handleChange}
                  percentage
                />
                </Grid>
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      dialogContent = (
        <React.Fragment>
            <h3>Rezultati</h3>
            <Grid container className="container" spacing={16}>
                <TextField
                  label="Ukupan prosjek"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={(prosjekSvihRazreda / 4).toFixed(2)}
                />
                <TextField
                  label="Broj bodova od ocjena"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10)}
                />
                <TextField
                  label="Broj bodova od HJ"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaHj)}
                />
                <TextField
                  label="Broj bodova od MAT"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaMat)}
                />
                <TextField
                  label="Broj bodova od EJ"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaEj)}
                />
                <TextField
                  label="Broj bodova od IZB"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaIzb)}
                />
                <TextField
                  label="Ukupan broj bodova"
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={Math.round(bodoviZaIzb + bodoviZaEj + bodoviZaHj + bodoviZaMat + Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10))}
                />
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
