const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');

function generate(data, cb) {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: [172.91304, 257.95296],
    margin: 20
  });

  let page = doc.page;
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512 + 8.50392, 155.90520 + 8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  doc.font('fonts/Overpass/Overpass-Regular.ttf');
  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 0]);

  doc.lineWidth(3)
    .moveTo(60, 150)
    .lineTo(190, 20)
    .fillAndStroke(data.color || [25, 100, 100, 5], data.color || [25, 100, 100, 5])
    .stroke();

  doc.fillColor([25, 100, 100, 5])
    .text(data.name)
    .fillColor([0, 0, 0, 85])
    .text(data.position);

  doc.addPage();
  page = doc.page;
  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 25]);
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512 + 8.50392, 155.90520 + 8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.test}`, (err, response, buffer) => {
    doc.image(buffer, (doc.page.width - 80) / 2, (doc.page.height - 80) / 2, { width: 80 });
    doc.end();
    cb();
  });

  doc.pipe(fs.createWriteStream('public/businesscard.pdf'));
}

module.exports = {
  generate
};
