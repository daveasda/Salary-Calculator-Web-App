import express from 'express';
import multer from 'multer';

// controller functions
import { uploadFile, downloadExcel } from '../controller/employeeController.js';

const router = express.Router(); //instance of the express router

const upload = multer({
    storage:multer.memoryStorage()
});

//Create task route
router.post('/upload', upload.single("file"), uploadFile);
router.post( "/download", upload.single("file"), downloadExcel);

export default router;