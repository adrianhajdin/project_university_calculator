
import React, { Component } from 'react';

import { Button, Divider, Grid, Card, CardHeader, CardContent, Tooltip, Icon, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';

import './App.css';
import logo from './public/calculator-icon.png';
import { Input, Stepper, Table } from './components';

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
                required
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="prosjekDrugiRazred"
                value={prosjekDrugiRazred}
                onChange={this.handleChange}
                label="2. razred"
                required
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="prosjekTreciRazred"
                value={prosjekTreciRazred}
                onChange={this.handleChange}
                label="3. razred"
                required
              />
            </Grid>
            <Grid item sm={12} lg={3}>
              <Input
                name="prosjekCetvrtiRazred"
                value={prosjekCetvrtiRazred}
                onChange={this.handleChange}
                label="4. razred"
                required
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
                required
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="postotakMaturaMat"
                label="Matematika"
                value={postotakMaturaMat}
                onChange={this.handleChange}
                percentage
                required
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                name="postotakMaturaEj"
                label="Engleski jezik"
                value={postotakMaturaEj}
                onChange={this.handleChange}
                percentage
                required
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
                    required
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
          <Table props={{ evaluationOpt, prosjekSvihRazreda, bodoviOdOcjena, bodoviZaHj, bodoviZaMat, bodoviZaEj, bodoviZaIzb }} />
          <Typography className="result" variant="title">Ukupan broj bodova: {Math.round(bodoviOdMature + bodoviOdOcjena)}</Typography>
          <Divider light className="divider" />
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        <Card raised className="paper">
          <div className="heading">
            <CardHeader className="cardHeader" title="Kalkulator bodova za upis na fakultet" />
            <img className="icon" src={logo} alt="calculator-icon" height="64" width="64" />
          </div>
          <CardContent className="paddingTop0">
            <ValidatorForm noValidate onSubmit={this.handleClick}>
              {dialogContent}
              <Stepper activeStep={activeStep} />
              { activeStep === 3
                ? <Button onClick={this.handleBack} fullWidth size="large" variant="contained" style={{ backgroundColor: 'rgba(127, 76, 178)' }}>Na početak</Button>
                : <Button type="submit" fullWidth size="large" variant="contained" style={{ backgroundColor: 'rgba(127, 76, 178)' }}>{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
              }
            </ValidatorForm>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
