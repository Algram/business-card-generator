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

  doc.font(`fonts/${data.font}-regular.ttf`);
  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 0]);

  doc.rect(0, page.height / 2, page.width, page.height / 2)
    .fill(data.color);

  doc.fillColor([0, 0, 0, 85])
    .fontSize(12)
    .text(data.name.toUpperCase(), 35, 50, { width: 200, align: 'right', lineGap: -2 })
    .font(`fonts/${data.font}-light.ttf`)
    .fontSize(10)
    .text(data.position, { width: 200, align: 'right' });

  doc.fillColor([0, 0, 0, 85])
    .font(`fonts/${data.font}-light.ttf`)
    .fontSize(10)
    .text(data.street, 20, 105, { width: 200, lineGap: -3 })
    .text(data.city, { width: 200, lineGap: -3 })
    .text(data.phone, { width: 200, lineGap: -3 })
    .text(data.email, { width: 200, lineGap: -3 });

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
  page.dictionary.data.TrimBox = [8.50392, 8.50392, 240.94512 + 8.50392, 155.90520 + 8.50392];
  page.dictionary.data.BleedBox = [0, 0, 257.95296, 172.91304];

  doc.rect(0, 0, page.width, page.height)
    .fill([0, 0, 0, 0]);

  doc.rect(0, page.height / 2, page.width, page.height / 2)
    .fill(data.color);

  if (fsExistsSync('public/logo.jpg')) {
    doc.image('public/logo.jpg', (doc.page.width - 35) / 2, 18, { width: 35 });
  }

  request(`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${data.qrcode}`, (err, response, buffer) => {
    doc.image(buffer, (doc.page.width - 80) / 2, (doc.page.height - 50) / 2, { width: 80 });

    doc.rect((doc.page.width - 80) / 2, (doc.page.height - 50) / 2, 80, 80)
      .lineWidth(3)
      .stroke([0, 0, 0, 85]);

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
