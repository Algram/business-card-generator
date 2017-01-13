const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');

function generate(data, cb) {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: [156, 241]
  });

  const page = doc.page;

  doc.rect(0, 0, page.width, page.height)
    .fill('#111111');

  doc.fillColor('red')
    .text(data.test)
    .text(new Date().toLocaleString());

  doc.addPage();

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.test}`, (err, response, buffer) => {
    doc.image(buffer, 0, 0, { width: 150 });
    doc.end();
    cb();
  });

  doc.pipe(fs.createWriteStream('public/output.pdf'));
}

module.exports = {
  generate
};
