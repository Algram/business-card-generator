const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');

function generate(data, cb) {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: [172.91304, 257.95296],
    margins: {
      top: 20,
      bottom: 10,
      left: 20,
      right: 20
    }
  });

  let page = doc.page;
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512 + 8.50392, 155.90520 + 8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  doc.font('fonts/Overpass/Overpass-Regular.ttf');
  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 0]);

  doc.rect(0, page.height / 2, page.width, page.height / 2)
    .fill(data.color);

  doc.fillColor([0, 0, 0, 85])
    .fontSize(12)
    .text(data.name.toUpperCase(), 50, 50, { width: 200, align: 'right', lineGap: -2 })
    .font('fonts/Overpass/Overpass-Light.ttf')
    .fontSize(10)
    .text(data.position, { width: 200, align: 'right' });

  doc.fillColor([0, 0, 0, 85])
    .font('fonts/Overpass/Overpass-Light.ttf')
    .fontSize(10)
    .text(data.street, 12, 110, { width: 200, lineGap: -3 })
    .text(data.city, { width: 200, lineGap: -3 })
    .text(data.phone, { width: 200, lineGap: -3 })
    .text(data.email, { width: 200, lineGap: -3 });

  doc.addPage();
  page = doc.page;
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512 + 8.50392, 155.90520 + 8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 0]);

  doc.rect(0, page.height / 2, page.width, page.height / 2)
    .fill(data.color);

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.name}`, (err, response, buffer) => {
    doc.image(buffer, (doc.page.width - 80) / 2, (doc.page.height - 80) / 2, { width: 80 });

    doc.rect((doc.page.width - 80) / 2, (doc.page.height - 80) / 2, 80, 80)
      .lineWidth(3)
      .stroke([0, 0, 0, 85]);

    doc.end();
    cb();
  });

  doc.pipe(fs.createWriteStream('public/businesscard.pdf'));
}

module.exports = {
  generate
};
