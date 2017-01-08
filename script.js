const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
  layout: 'landscape',
  size: [200, 350]
});

const page = doc.page;

doc.rect(0, 0, page.width, page.height)
  .fill('#111111');

doc.fillColor('red')
  .text('Some random test text');

doc.pipe(fs.createWriteStream('output.pdf'));

doc.end();
