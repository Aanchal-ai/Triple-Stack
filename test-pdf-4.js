const pdfParse = require('pdf-parse/lib/pdf-parse.js');
const fs = require('fs');
async function test() {
  const fileContent = Buffer.from("%PDF-1.4\n1 0 obj <</Type/Catalog/Pages 2 0 R>> endobj 2 0 obj <</Type/Pages/Kids[3 0 R]/Count 1>> endobj 3 0 obj <</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>> endobj\ntrailer <</Size 4/Root 1 0 R>>\n%%EOF"); 
  try {
    const result = await pdfParse(fileContent);
    console.log("Success text:", result.text);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
