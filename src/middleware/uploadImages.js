import multer from 'multer'
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __dirname = path.resolve()
    const destinationPath = path.join(__dirname, 'public', 'productImages');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;