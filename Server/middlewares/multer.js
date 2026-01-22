import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads"); // absolute path
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // use absolute path
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // get file extension
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

// Multer upload instance
const upload = multer({ storage });

export default upload;
