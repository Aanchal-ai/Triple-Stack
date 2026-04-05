const pdfParse = require('pdf-parse');
console.log(typeof pdfParse);
if (typeof pdfParse === 'object') {
  console.log(Object.keys(pdfParse));
}
