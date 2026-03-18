const pdfParse = require('pdf-parse/lib/pdf-parse');
const mammoth = require('mammoth');
const path = require('path');
console.log("pdfParse type" , typeof pdfParse);   
async function extractTextFromResume(buffer , filename){
  const ext  = path.extname(filename).toLowerCase();
  if(ext === '.pdf') {
    const result = await pdfParse(buffer);
    return result.text.trim();
  }
  if(ext === '.doc' || ext === '.docx'){
    const result = await mammoth.extractRawText({buffer});
    return result.value.trim();
  }
  throw new Error('Unsupported file type');
}

module.exports = { extractTextFromResume };