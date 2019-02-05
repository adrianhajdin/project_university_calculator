const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

// HTML predložak po kojemu će biti stvorena PDF datoteka
const data = require('./documents');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// POST request - Generira PDF
app.post('/create-pdf', (req, res) => pdf.create(data(req.body.state), {}).toFile(`${req.body.id}.pdf`, () => res.end()));

// GET request - Šalje generirani PDF na frontend
app.get('/fetch-pdf/:id', (req, res) => res.sendFile(`${__dirname}/${req.params.id}.pdf`));
