const fs = require('fs');

async function testUpload() {
  const fileContent = Buffer.from("%PDF-1.4\n1 0 obj <</Type/Catalog/Pages 2 0 R>> endobj 2 0 obj <</Type/Pages/Kids[3 0 R]/Count 1>> endobj 3 0 obj <</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>> endobj\ntrailer <</Size 4/Root 1 0 R>>\n%%EOF"); // minimal pdf
  const formData = new FormData();
  formData.append('file', new Blob([fileContent], { type: 'application/pdf' }), "test.pdf");
  
  try {
    const response = await fetch('http://localhost:3000/api/extract-pdf', {
      method: 'POST',
      body: formData
    });

    const body = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", body);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
testUpload();
