import multer from "multer";

// Use memory storage instead of disk storage
// Files will be stored in memory as Buffer objects
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

export default upload;
