const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');

function generate(data, cb) {
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

  doc.addPage();

  request(`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${data.test}`, (err, response, buffer) => {
    console.log('asdasd', typeof buffer);
    doc.image(new Buffer(buffer));
    doc.end();
    cb();
  });

  doc.pipe(fs.createWriteStream('public/output.pdf'));
}

module.exports = {
  generate
};
