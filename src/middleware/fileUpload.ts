// src/middleware/fileUpload.ts

import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only JPG and PNG files are allowed'));
        }
    }
});

export default upload;
