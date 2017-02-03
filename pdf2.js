const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const PDFDocument = require('pdfkit');


function fsExistsSync(myDir) {
  try {
    fs.accessSync(myDir);
    return true;
  } catch (e) {
    return false;
  }
}

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
    .text(data.street, 35, 105, { width: 200, lineGap: -3, align: 'right' })
    .text(data.city, { width: 200, lineGap: -3, align: 'right' })
    .text(data.phone, { width: 200, lineGap: -3, align: 'right' })
    .text(data.email, { width: 200, lineGap: -3, align: 'right' });


  if (fsExistsSync('public/logo.jpg')) {
    doc.image('public/logo.jpg', 20, 54, { width: 35 });
  }

  /* Ab hier weiße Schnittmarken */
  /* Schnittmarke lovw */
  doc.lineWidth(1.5)
    .moveTo(8.50392, 0)
    .lineTo(8.50392, 5.6692944)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke luvw */
  doc.lineWidth(1.5)
    .moveTo(8.50392, 167.24376)
    .lineTo(8.50392, 172.91304)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke ruvw */
  doc.lineWidth(1.5)
    .moveTo(249.44904, 167.24376)
    .lineTo(249.44904, 172.91304)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke rovw */
  doc.lineWidth(1.5)
    .moveTo(249.44904, 0)
    .lineTo(249.44904, 5.6692944)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke lohw */
  doc.lineWidth(1.5)
    .moveTo(0, 8.50392)
    .lineTo(5.6692944, 8.50392)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke luhw */
  doc.lineWidth(1.5)
    .moveTo(0, 164.40912)
    .lineTo(5.6692944, 164.40912)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke ruhw */
  doc.lineWidth(1.5)
    .moveTo(252.28368, 164.40912)
    .lineTo(257.95296, 164.40912)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();

  /* Schnittmarke rohw */
  doc.lineWidth(1.5)
    .moveTo(252.28368, 8.50392)
    .lineTo(257.95296, 8.50392)
    .fillAndStroke([0, 0, 0, 0])
    .stroke();


  /* Ab hier schwarze Schnittmarken */
  /* Schnittmarke lovs */
  doc.lineWidth(0.5)
    .moveTo(8.50392, 0)
    .lineTo(8.50392, 5.6692944)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke luvs */
  doc.lineWidth(0.5)
    .moveTo(8.50392, 167.24376)
    .lineTo(8.50392, 172.91304)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke ruvs */
  doc.lineWidth(0.5)
    .moveTo(249.44904, 167.24376)
    .lineTo(249.44904, 172.91304)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke rovs */
  doc.lineWidth(0.5)
    .moveTo(249.44904, 0)
    .lineTo(249.44904, 5.6692944)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke lohs */
  doc.lineWidth(0.5)
    .moveTo(0, 8.50392)
    .lineTo(5.6692944, 8.50392)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke luhs */
  doc.lineWidth(0.5)
    .moveTo(0, 164.40912)
    .lineTo(5.6692944, 164.40912)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke ruhs */
  doc.lineWidth(0.5)
    .moveTo(252.28368, 164.40912)
    .lineTo(257.95296, 164.40912)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();

  /* Schnittmarke rohs */
  doc.lineWidth(0.5)
    .moveTo(252.28368, 8.50392)
    .lineTo(257.95296, 8.50392)
    .fillAndStroke([100, 100, 100, 100])
    .stroke();


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

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.qrcode}`, (err, response, buffer) => {
    doc.image(buffer, (doc.page.width - 110), (doc.page.height - 80) / 2, { width: 80 });


    /* Ab hier weiße Schnittmarken */
    /* Schnittmarke lovw */
    doc.lineWidth(1.5)
      .moveTo(8.50392, 0)
      .lineTo(8.50392, 5.6692944)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke luvw */
    doc.lineWidth(1.5)
      .moveTo(8.50392, 167.24376)
      .lineTo(8.50392, 172.91304)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke ruvw */
    doc.lineWidth(1.5)
      .moveTo(249.44904, 167.24376)
      .lineTo(249.44904, 172.91304)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke rovw */
    doc.lineWidth(1.5)
      .moveTo(249.44904, 0)
      .lineTo(249.44904, 5.6692944)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke lohw */
    doc.lineWidth(1.5)
      .moveTo(0, 8.50392)
      .lineTo(5.6692944, 8.50392)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke luhw */
    doc.lineWidth(1.5)
      .moveTo(0, 164.40912)
      .lineTo(5.6692944, 164.40912)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke ruhw */
    doc.lineWidth(1.5)
      .moveTo(252.28368, 164.40912)
      .lineTo(257.95296, 164.40912)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();

    /* Schnittmarke rohw */
    doc.lineWidth(1.5)
      .moveTo(252.28368, 8.50392)
      .lineTo(257.95296, 8.50392)
      .fillAndStroke([0, 0, 0, 0])
      .stroke();


    /* Ab hier schwarze Schnittmarken */
    /* Schnittmarke lovs */
    doc.lineWidth(0.5)
      .moveTo(8.50392, 0)
      .lineTo(8.50392, 5.6692944)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke luvs */
    doc.lineWidth(0.5)
      .moveTo(8.50392, 167.24376)
      .lineTo(8.50392, 172.91304)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke ruvs */
    doc.lineWidth(0.5)
      .moveTo(249.44904, 167.24376)
      .lineTo(249.44904, 172.91304)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke rovs */
    doc.lineWidth(0.5)
      .moveTo(249.44904, 0)
      .lineTo(249.44904, 5.6692944)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke lohs */
    doc.lineWidth(0.5)
      .moveTo(0, 8.50392)
      .lineTo(5.6692944, 8.50392)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke luhs */
    doc.lineWidth(0.5)
      .moveTo(0, 164.40912)
      .lineTo(5.6692944, 164.40912)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke ruhs */
    doc.lineWidth(0.5)
      .moveTo(252.28368, 164.40912)
      .lineTo(257.95296, 164.40912)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    /* Schnittmarke rohs */
    doc.lineWidth(0.5)
      .moveTo(252.28368, 8.50392)
      .lineTo(257.95296, 8.50392)
      .fillAndStroke([100, 100, 100, 100])
      .stroke();

    doc.end();
    setTimeout(() => {
      cb();
    }, 200);
  });

  doc.pipe(fs.createWriteStream('public/businesscard.pdf'));
}

module.exports = {
  generate
};
