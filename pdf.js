const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');

function generate(data, cb) {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: [172.91304, 257.95296],
    margin: 15
  });

  let page = doc.page;
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512+8.50392, 155.90520+8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  doc.rect(0, 0, page.width, page.height)
    .fill('#111111');

  doc.fillColor('red')
    .text(data.test)
    .text(new Date().toLocaleString());

  doc.addPage();
  page = doc.page;
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512+8.50392, 155.90520+8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.test}`, (err, response, buffer) => {
    doc.image(buffer, 0, 0, { width: 80 });
    doc.end();
    cb();
  });

  doc.pipe(fs.createWriteStream('public/output.pdf'));
}

module.exports = {
  generate
};
