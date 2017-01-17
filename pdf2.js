const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');

function generate(data, cb) {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: [172.91304, 257.95296],
    margin: 5
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
    .fillAndStroke(data.color, data.color)
    .stroke();

  doc.fillColor(data.color)
    .fontSize(12)
    .text(data.name, 20, 20, { lineGap: -2 })
    .font('fonts/Overpass/Overpass-Light.ttf')
    .fontSize(10)
    .fillColor([0, 0, 0, 85])
    .text(data.position);

  doc.fillColor([0, 0, 0, 85])
    .font('fonts/Overpass/Overpass-Light.ttf')
    .fontSize(10)
    .text(data.street, 40, 105, { width: 200, lineGap: -3, align: 'right' })
    .text(data.city, { width: 200, lineGap: -3, align: 'right' })
    .text(data.phone, { width: 200, lineGap: -3, align: 'right' })
    .text(data.email, { width: 200, lineGap: -3, align: 'right' });

  doc.addPage();
  page = doc.page;
  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 25]);
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512 + 8.50392, 155.90520 + 8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  doc.lineWidth(3)
    .moveTo(32, 122)
    .lineTo(102, 52)
    .fillAndStroke(data.color, data.color)
    .stroke();

  doc.fillColor([0, 0, 0, 85])
    .font('fonts/Overpass/Overpass-Bold.ttf')
    .fontSize(48)
    .text(data.name.split(' ')[0][0], 30, 30)
    .text(data.name.split(' ')[1] !== undefined ? data.name.split(' ')[1][0] : '', 75, 75);

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.name}`, (err, response, buffer) => {
    doc.image(buffer, (doc.page.width - 110), (doc.page.height - 80) / 2, { width: 80 });
    doc.end();
    setTimeout(() => {
      cb();
    }, 100);
  });

  doc.pipe(fs.createWriteStream('public/businesscard.pdf'));
}

module.exports = {
  generate
};
