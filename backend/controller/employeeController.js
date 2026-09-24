import processAttendance from "../utils/processAttendance.js";
import generateAttendanceExcel from "../utils/generateAttendanceExcel.js";

import { ZipArchive } from "archiver";


export const uploadFile = async (req, res) => {

    try {

        // Process uploaded attendance file
        const employees = processAttendance(req.file.buffer);

        console.log("Employees calculated:", employees.length);


        res.json({ 
            message: "Successfully processed attendance",
            employees: employees
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};