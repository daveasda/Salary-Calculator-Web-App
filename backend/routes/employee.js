import express from 'express';

const router = express.Router(); //instance of the express router

// controller functions
import { uploadFile } from '../controller/employeeController.js';

//Create task route
router.post('/upload', uploadFile)


export default router;