const express = require('express');
const bodyParser = require('body-parser');

const createPdf = require('./createPdf')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/print-pdf', (req, res) => {
  createPdf();

  console.log(req.body);
});
