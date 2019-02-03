const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const path = require('path');

const data = require('./documents');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// POST request - Kreira PDF i šalje resolved Promise natrag na client tako da se može lančano dodati .then()
app.post('/create-pdf', (req, res) => {
  pdf.create(data(req.body), {}).toFile('rezultati.pdf', () => res.send(Promise.resolve()));
})

// GET request - Šalje generirani PDF natrag na klijentsku stranu tako da se može koristiti tamo
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/rezultati.pdf`);
});
