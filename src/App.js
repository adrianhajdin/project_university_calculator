
import React, { Component } from 'react';

import { TableCell, Table, TableBody, TableRow, Button, Stepper, Divider, Step, StepLabel, Grid, Card, CardHeader, CardContent, Tooltip, Icon, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';

import './App.css';
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
    const steps = ['Raspodjela bodova za upis', 'Prosjek ocjena', 'Rezultati mature', 'Ukupan broj bodova'];

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light className="dividerMarginBottom" />
          <Typography className="typography" variant="title">
            Ocjene iz srednje škole {!isMobile ? <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za prosjek ocjena srednje škole"><Icon className="tooltipIcon">info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za prosjek ocjena srednje škole</Typography> : null}
          <Input
            name="evaluationGrades"
            label="Prosjek svih ocjena"
            value={evaluationGrades}
            onChange={this.handleChange}
            percentage
            required
          />
          <Divider light className="divider" />
          <Typography className="typography" variant="title">
            Obvezni dio državne mature {!isMobile ? <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za obvezni dio drzavne mature"><Icon className="tooltipIcon">info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za obvezni dio drzavne mature</Typography> : null}
          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationHj"
                label="Hrvatski"
                value={evaluationHj}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationMat"
                label="Matematika"
                value={evaluationMat}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationEj"
                label="Engleski jezik"
                value={evaluationEj}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
          </Grid>
          <Divider light className="divider" />
          <Typography className="typography" variant="title">
            Izborni dio državne mature {!isMobile ? <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za izborni dio drzavne mature"><Icon className="tooltipIcon">info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za izborni dio drzavne mature</Typography> : null}
          <Input
            name="evaluationOpt"
            label="Izborni predmet"
            value={evaluationOpt}
            onChange={this.handleChange}
            percentage
          />
          <Divider light className="divider" />
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <Divider light className="dividerMarginBottom" />
          <Typography className="typography" variant="title">
            Prosjeci sva cetiri razreda {!isMobile ? <Tooltip title="Ovdje upišite prosjeke ocjena od 1. do 4. razreda srednje skole"><Icon className="tooltipIcon">info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography className="mobileTooltip" variant="caption">Ovdje upišite prosjeke ocjena od 1. do 4. razreda srednje skole</Typography> : null }
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                name="prosjekPrviRazred"
                value={prosjekPrviRazred}
                onChange={this.handleChange}
                label="1. razred"
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="prosjekDrugiRazred"
                value={prosjekDrugiRazred}
                onChange={this.handleChange}
                label="2. razred"
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="prosjekTreciRazred"
                value={prosjekTreciRazred}
                onChange={this.handleChange}
                label="3. razred"
              />
            </Grid>
            <Grid item sm={12} lg={3}>
              <Input
                name="prosjekCetvrtiRazred"
                value={prosjekCetvrtiRazred}
                onChange={this.handleChange}
                label="4. razred"
              />
            </Grid>
          </Grid>
          <Divider light className="divider" />
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <Divider light className="dividerMarginBottom" />
          <Typography className="typography" variant="title">
            Rezultati mature {!isMobile ? <Tooltip title="Ovdje upišite postotke pojedinih predmeta s mature"><Icon className="tooltipIcon">info_outlined</Icon></Tooltip> : null}
          </Typography>
          {isMobile ? <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotke pojedinih predmeta s mature</Typography> : null }
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                name="postotakMaturaHj"
                label="Hrvatski jezik"
                value={postotakMaturaHj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="postotakMaturaMat"
                label="Matematika"
                value={postotakMaturaMat}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="postotakMaturaEj"
                label="Engleski jezik"
                value={postotakMaturaEj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            { evaluationOpt !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <Input
                    name="postotakMaturaIzb"
                    label="Izborni predmet"
                    value={postotakMaturaIzb}
                    onChange={this.handleChange}
                    percentage
                  />
                </Grid>
              ) : null
            }
          </Grid>
          <Divider light className="divider" />
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      const bodoviOdMature = bodoviZaEj + bodoviZaHj + bodoviZaIzb + bodoviZaMat;
      const bodoviOdOcjena = Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10);

      dialogContent = (
        <React.Fragment>
          <Divider light className="dividerMarginBottom" />
          <Typography className="typography" variant="title">Rezultati</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Ukupan prosjek: </TableCell>
                <TableCell>{(prosjekSvihRazreda / 4).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Broj bodova od ocjena: </TableCell>
                <TableCell>{bodoviOdOcjena}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Broj bodova od mature iz Hrvatskog jezika: </TableCell>
                <TableCell>{bodoviZaHj}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Broj bodova od Matematike </TableCell>
                <TableCell>{bodoviZaMat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Broj bodova od mature iz Engleskog jezika: </TableCell>
                <TableCell>{bodoviZaEj}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Broj bodova od mature iz Izbornog predmeta: </TableCell>
                <TableCell>{bodoviZaIzb}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography className="sectionDivider" variant="title">Ukupan broj bodova: {Math.round(bodoviOdMature + bodoviOdOcjena)}</Typography>
          <Divider light className="divider" />
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        <Card raised className="paper" style={isMobile ? { height: '100%', justifyContent: 'space-between' } : { justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <CardHeader style={isMobile ? { paddingBottom: 0 } : null} title="Kalkulator bodova za upis na fakultet" />
            <img style={isMobile ? { paddingLeft: '14px' } : { padding: '16px 0' }} src="icons8-calculator-64.png" alt="Kitten" height="64" width="64" />
          </div>
          <CardContent className="paddingTop0">
            <ValidatorForm noValidate name="form" onSubmit={this.handleClick}>
              {dialogContent}
              {!isMobile ? (
                <Stepper className="paddingTop0" activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              ) : null}
              { activeStep === 3
                ? <Button onClick={this.handleBack} fullWidth size="large" variant="contained" color="primary">Na početak</Button>
                : <Button type="submit" fullWidth size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
              }
            </ValidatorForm>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
