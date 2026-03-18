const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ['.pdf' , '.doc' , '.docx']; 
  if (allowed.includes(ext)){
    cb(null, true);
  }
  else{
    cb(new Error('Only PDF and Word documents are allowed'), false);
  };
 
  
}
 const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });
module.exports = upload;