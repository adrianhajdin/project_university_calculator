import React, { Component } from 'react';
import './App.css'

import TextField from '@material-ui/core/TextField';
import { FormControl, Button } from '@material-ui/core';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: 0,
      prosjekPrviRazred: 0,
      prosjekDrugiRazred: 0,
      prosjekTreciRazred: 0,
      prosjekCetvrtiRazred: 0,
      bodoviZaOcjene: 0,
    }
  }

  handleChangeBodoviZaOcjene = (event) => {
    this.setState({ bodoviZaOcjene: parseFloat(event.target.value, 10) })
  }

  handleChange = (event) => {
    const { value } = event.target;
    const numberValue = parseFloat(value, 10)

    this.setState({ [event.target.name]: numberValue })
  }

  handleClick = () => {
    const { prosjekPrviRazred, prosjekDrugiRazred, prosjekTreciRazred, prosjekCetvrtiRazred } = this.state
    console.log(this.state.prosjekCetvrtiRazred)
    this.setState({ value: prosjekPrviRazred + prosjekDrugiRazred + prosjekTreciRazred + prosjekCetvrtiRazred })
  }
  render() {
    return (
      <div className="App">
        <h1>Kalkulator bodova za upis na fakultet</h1>
        <FormControl >
          <TextField
            label="Broj bodova u postocima"
            type="number"
            helperText="Bodovi za ocjene"
            onChange={value => this.handleChangeBodoviZaOcjene(value)}
            required
          />
          {/* <TextField
            label="Broj bodova matura HJ"
            type="number"
            helperText="Bodovi za ocjene matura HJ"
            onChange={value => this.handleChangeBodoviZaOcjene(value, )}
            required
          />
          <TextField
            label="Broj bodova matura MAT"
            type="number"
            helperText="Bodovi za ocjene matura MAT"
            onChange={value => this.handleChangeBodoviZaOcjene(value)}
            required
          />
          <TextField
            label="Broj bodova matura EJ"
            type="number"
            helperText="Bodovi za ocjene matura EJ"
            onChange={value => this.handleChangeBodoviZaOcjene(value)}
            required
          /> */}
          <TextField
            name="prosjekPrviRazred"
            label="Prvi razred"
            type="number"
            helperText="Prosjek ocjena 1. razreda srednje skole"
            onChange={event => this.handleChange(event)}
            required
          />
          <TextField
            name="prosjekDrugiRazred"
            label="Drugi razred"
            type="number"
            helperText="Prosjek ocjena 2. razreda srednje skole"
            onChange={event => this.handleChange(event)}
            required
          />
          <TextField
            name="prosjekTreciRazred"
            label="Treci razred"
            type="number"
            helperText="Prosjek ocjena 3. razreda srednje skole"
            onChange={event => this.handleChange(event)}
            required
          />
          <TextField
            name="prosjekCetvrtiRazred"
            label="Cetvrti razred"
            type="number"
            helperText="Prosjek ocjena 4. razreda srednje skole"
            onChange={event => this.handleChange(event)}
            required
          />
          <Button variant="outlined"  onClick={this.handleClick}>Submit</Button>
          <br></br>
          <TextField
            label="Ukupan prosjek"
            type="number"
            helperText="Ukupan prosjek cetiri razreda"
            value={(this.state.value / 4).toFixed(2)}
          />
          <TextField
            label="Ukupan broj bodova od ocjena"
            type="number"
            helperText="Broj bodova"
            value={Math.round((this.state.value / 4).toFixed(2) / 5 *  this.state.bodoviZaOcjene * 10) }
          />
        </FormControl>
      </div>
    );
  }
}

export default App;
