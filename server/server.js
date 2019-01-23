const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const data = require('./documents');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/create-pdf', (req) => {
  pdf.create(data(req.body), {}).toFile('rezultati.pdf', (err, res) => {
    if (err) {
      console.log(err);
    }

    return res;
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/rezultati.pdf`);
});
