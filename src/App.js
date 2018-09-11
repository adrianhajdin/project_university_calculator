
import React, { Component } from 'react';
import './App.css';

import { Button, Stepper, MobileStepper, Step, StepLabel, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Input from './Input';

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
        prosjekSvihRazreda: parseFloat(prosjekPrviRazred, 10) + parseFloat(prosjekDrugiRazred, 10) + parseFloat(prosjekTreciRazred, 10) + parseFloat(prosjekCetvrtiRazred, 10),
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        bodoviZaHj: postotakMaturaHj * evaluationHj / 10,
        bodoviZaEj: postotakMaturaEj * evaluationEj / 10,
        bodoviZaMat: postotakMaturaMat * evaluationMat / 10,
        bodoviZaIzb: postotakMaturaIzb * evaluationOpt / 10,
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

    const bodoviOdMature = bodoviZaEj + bodoviZaHj + bodoviZaIzb + bodoviZaMat;
    const bodoviOdOcjena = Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10);

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <h3>Ocjene iz srednje škole</h3>
          <Input
            name="evaluationGrades"
            label="Prosjek svih ocjena"
            value={evaluationGrades}
            onChange={this.handleChange}
            percentage
          />
          <h3>Obvezni dio drzavne mature</h3>
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
          <h3>Izborni dio drzavne mature</h3>
          <Input
            name="evaluationOpt"
            label="Izborni predmet"
            value={evaluationOpt}
            onChange={this.handleChange}
            percentage
          />
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <h3>Prosjeci sva četiri razreda</h3>
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
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <h3>Prosjeci s državne mature</h3>
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
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      dialogContent = (
        <React.Fragment>
          <h3>Rezultati</h3>
          <Grid container className="container" spacing={16}>
            <Grid item xs={4}><h4>Ukupan prosjek: {(prosjekSvihRazreda / 4).toFixed(2)}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od ocjena: {bodoviOdOcjena}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od HJ: {bodoviZaHj}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od MAT: {bodoviZaMat}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od EJ: {bodoviZaEj}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od IZB: {bodoviZaIzb}</h4></Grid>
            <Grid item xs={4}><h4>Ukupan broj bodova: {Math.round(bodoviOdMature + bodoviOdOcjena)}</h4></Grid>
          </Grid>
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        <Card className="paper">
          <CardHeader title="Kalkulator bodova za upis na fakultet" />
          <CardContent>
            <ValidatorForm name="form" onSubmit={this.handleClick}>
              {dialogContent}
              <Grid container className="container" spacing={16}>
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
                  <Step key={4}>
                    <StepLabel>Ukupan broj bodova</StepLabel>
                  </Step>
                </Stepper>
                {/* <MobileStepper
                steps={4}
                position="static"
                activeStep={activeStep}
                nextButton={(
                  <Button size="small" onClick={this.handleNext} disabled={activeStep === 4 - 1}>Back</Button>
                  )}
                backButton={(
                  <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>Next</Button>
                  )}
              /> */}
              </Grid>
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
