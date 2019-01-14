const htmlPdf = require('html-pdf');

module.exports.create = (fileKey, html, options = {}) => new Promise((resolve, reject) => {
  const { border = { top: '55px', right: '40px', bottom: '55px', left: '40px' }, format = 'A4' } = options;

  htmlPdf.create(html, { format, border })
    .toFile(`.${fileKey}`, (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
});
