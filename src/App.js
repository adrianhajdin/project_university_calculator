
import React, { Component } from 'react';
import './App.css';

import { TableCell, Table, TableBody, TableRow, Button, Stepper, Divider, Step, StepLabel, Grid, Card, CardHeader, CardContent, Tooltip, Icon, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';

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

  componentDidMount() {
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

    let dialogContent;
    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '0 0 20px 0' }} />
          <Typography className="typography" style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Ocjene iz srednje škole
            {isMobile ? null : (
              <Tooltip tooltip={{ fontSize: '2em' }} title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za prosjek ocjena srednje škole">
                <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
              </Tooltip>
            )}
          </Typography>
          {isMobile
            ? (
              <Typography variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za prosjek ocjena srednje škole</Typography>
            ) : null
            }

          <Input
            autoFocus
            style={{ paddingBottom: '20px', marginBottom: '20px' }}
            name="evaluationGrades"
            label="Prosjek svih ocjena"
            value={evaluationGrades}
            onChange={this.handleChange}
            percentage
          />
          <Divider light style={{ margin: '20px 0' }} />
          <Typography className="typography" style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Obvezni dio državne mature
            {isMobile ? null : (
              <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za obvezni dio drzavne mature">
                <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
              </Tooltip>
            )}
          </Typography>
          {isMobile
            ? (
              <Typography variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za obvezni dio drzavne mature</Typography>
            ) : null
            }

          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationHj"
                label="Hrvatski"
                value={evaluationHj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationMat"
                label="Matematika"
                value={evaluationMat}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                name="evaluationEj"
                label="Engleski jezik"
                value={evaluationEj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
          </Grid>
          <Divider light style={{ margin: '20px 0' }} />
          <Typography className="typography" style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Izborni dio državne mature
            {isMobile ? null : (
              <Tooltip title="Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za izborni dio drzavne mature">
                <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
              </Tooltip>
            )}
          </Typography>
          {isMobile
            ? (
              <Typography variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam određeni fakultet pridaje za izborni dio drzavne mature</Typography>
            ) : null
            }
          <Input
            name="evaluationOpt"
            label="Izborni predmet"
            value={evaluationOpt}
            onChange={this.handleChange}
            percentage
          />
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '0 0 20px 0' }} />
          <Typography className="typography" style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Prosjeci sva cetiri razreda
            {isMobile ? null
              : (
                <Tooltip title="Ovdje upišite prosjeke ocjena od 1. do 4. razreda srednje skole">
                  <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
                </Tooltip>
              )}
          </Typography>
          {isMobile
            ? (
              <Typography variant="caption">Ovdje upišite prosjeke ocjena od 1. do 4. razreda srednje skole</Typography>
            ) : null
            }
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                autoFocus
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
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '0 0 20px 0' }} />
          <Typography className="typography" style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Rezultati mature
            {isMobile ? null
              : (
                <Tooltip title="Ovdje upišite postotke pojedinih predmeta s mature">
                  <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
                </Tooltip>
              )}
          </Typography>
          {isMobile
            ? (
              <Typography variant="caption">Ovdje upišite postotke pojedinih predmeta s mature</Typography>
            ) : null
            }
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                autoFocus
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
            <Grid item xs={12} lg={3}>
              <Input
                name="postotakMaturaIzb"
                label="Izborni predmet"
                value={postotakMaturaIzb}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
          </Grid>
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      const bodoviOdMature = bodoviZaEj + bodoviZaHj + bodoviZaIzb + bodoviZaMat;
      const bodoviOdOcjena = Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10);
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '0 0 20px 0' }} />
          <Typography className="typography" style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Rezultati
          </Typography>
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
          <Typography className="sectionDivider" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} variant="title">
            Ukupan broj bodova: {Math.round(bodoviOdMature + bodoviOdOcjena)}
          </Typography>
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    }
    return (
      <div className="App">
        <Card className="paper" style={isMobile ? { height: '100%' } : null}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <CardHeader style={isMobile ? { paddingBottom: 0 } : null} title="Kalkulator bodova za upis na fakultet" />
            <img style={isMobile ? { paddingLeft: '14px' } : { padding: '16px 0' }} src="icons8-calculator-64.png" alt="Kitten" height="64" width="64" />
          </div>
          <CardContent style={{ paddingTop: '0' }}>
            <ValidatorForm name="form" onSubmit={this.handleClick}>
              {dialogContent}
              {!isMobile ? (
                <Stepper style={{ paddingTop: '0' }} activeStep={activeStep}>
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
              ) : null}
              { activeStep === 3
                ? (
                  <Grid container justify="center" spacing={16}>
                    <Grid item xs={12}>
                      <Button onClick={this.handleBack} fullWidth size="large" variant="contained" color="primary">Na pocetak</Button>
                    </Grid>
                  </Grid>
                )
                : (
                  <Grid container justify="center" spacing={16}>
                    <Grid item xs={12}>
                      <Button type="submit" fullWidth size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
                    </Grid>
                  </Grid>
                )}
            </ValidatorForm>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
