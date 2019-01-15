const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

const data = require('./documents/pdfs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/print-pdf', (req, res) => {
  pdf.create(data(req.body), {}).toFile('rezultati.pdf', (err, res) => {
    if (err) {
      return console.log(err);
    }

      return res;
    })
});
