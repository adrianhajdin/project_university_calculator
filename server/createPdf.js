const pdf = require('html-pdf');
const fs = require('fs');

const html = fs.readFileSync('./documents/pdfTemplate.html', 'utf8');
const data = require('./documents/pdfs');

console.log(data());


pdf.create(data(), {}).toFile('./businesscard.pdf', (err, res) => {
  if (err) {
    return console.log(err);
  }

  console.log(res);
});