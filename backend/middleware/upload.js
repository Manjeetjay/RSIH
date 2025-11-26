import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directories exist
const createDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

createDir("uploads/docs");
createDir("uploads/ppts");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "identification_doc") {
            cb(null, "uploads/docs");
        } else if (file.fieldname === "ppt_file") {
            cb(null, "uploads/ppts");
        } else {
            cb(null, "uploads");
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

export default upload;
