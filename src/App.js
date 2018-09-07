import React, { Component } from 'react';
import './App.css';

import TextField from '@material-ui/core/TextField';
import { FormControl, Button } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prosjekSvihRazreda: 0,
      prosjekPrviRazred: 0,
      prosjekDrugiRazred: 0,
      prosjekTreciRazred: 0,
      prosjekCetvrtiRazred: 0,
      bodoviZaOcjene: 0,
      bodoviZaHj: 0,
      bodoviZaMat: 0,
      bodoviZaEj: 0,
      bodoviZaIzb: 0,
      postotakMaturaHj: 0,
      postotakMaturaMat: 0,
      postotakMaturaEj: 0,
      postotakMaturaIzb: 0,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    const numberValue = parseFloat(value, 10);

    this.setState({ [event.target.name]: numberValue });
  }

  handleClick = () => {
    const { prosjekPrviRazred, prosjekDrugiRazred, prosjekTreciRazred, prosjekCetvrtiRazred, postotakMaturaHj, bodoviHj, postotakMaturaEj, postotakMaturaMat, bodoviEj, bodoviMat, postotakMaturaIzb, bodoviIzb } = this.state;

    this.setState({
      prosjekSvihRazreda: prosjekPrviRazred + prosjekDrugiRazred + prosjekTreciRazred + prosjekCetvrtiRazred,
      bodoviZaHj: postotakMaturaHj * bodoviHj * 10 / 100,
      bodoviZaEj: postotakMaturaEj * bodoviEj * 10 / 100,
      bodoviZaMat: postotakMaturaMat * bodoviMat * 10 / 100,
      bodoviZaIzb: postotakMaturaIzb * bodoviIzb * 10 / 100,
    });
  }

  render() {
    const { prosjekSvihRazreda, bodoviZaOcjene, bodoviZaHj, bodoviZaEj, bodoviZaMat, bodoviZaIzb } = this.state;

    return (
      <div className="App">
        <h1>Kalkulator bodova za upis na fakultet</h1>
        <FormControl>
          <TextField
            name="bodoviZaOcjene"
            label="Broj bodova u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="bodoviHj"
            label="Matura HJ u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="bodoviMat"
            label="Matura MAT u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="bodoviEj"
            label="Matura EJ u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="bodoviIzb"
            label="Matura IZB u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <br /><br />
          <TextField
            name="prosjekPrviRazred"
            label="Prosjek Prvi razred"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="prosjekDrugiRazred"
            label="Prosjek Drugi razred"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="prosjekTreciRazred"
            label="Prosjek Treci razred"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="prosjekCetvrtiRazred"
            label="Prosjek Cetvrti razred"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="postotakMaturaHj"
            label="Matura HJ u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="postotakMaturaMat"
            label="Matura MAT u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="postotakMaturaEj"
            label="Matura EJ u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <TextField
            name="postotakMaturaIzb"
            label="Matura IZB u %"
            type="number"
            onChange={event => this.handleChange(event)}
          />
          <Button variant="outlined" onClick={this.handleClick}>Submit</Button>
          <br /><br />
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
            value={Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * bodoviZaOcjene * 10)}
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
            value={Math.round(bodoviZaIzb + bodoviZaEj + bodoviZaHj + bodoviZaMat + Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * bodoviZaOcjene * 10))}
          />
        </FormControl>
      </div>
    );
  }
}

export default App;
