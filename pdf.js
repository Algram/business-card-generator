const fs = require('fs');
const PDFDocument = require('pdfkit');

function generate(data) {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: [200, 350]
  });

  const page = doc.page;

  doc.rect(0, 0, page.width, page.height)
    .fill('#111111');

  doc.fillColor('red')
    .text(data.test)
    .text(new Date().toLocaleString());

  doc.pipe(fs.createWriteStream('public/output.pdf'));

  doc.end();
}

module.exports = {
  generate
};
