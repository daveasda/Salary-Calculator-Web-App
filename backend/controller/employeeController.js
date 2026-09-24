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

// ==========================================
// DOWNLOAD EXCEL FILES
// ==========================================

export const downloadExcel = async (req, res) => {

    try {

        const employees =
            processAttendance(req.file.buffer);


        res.setHeader(
            "Content-Type",
            "application/zip"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="attendance-files.zip"'
        );


        const zip =
            new ZipArchive();

        zip.pipe(res);


        for (const employee of employees) {

            const excelBuffer =
                await generateAttendanceExcel(
                    employee
                );


            const fileName =
                `${employee.name} ${employee.monthLabel} attendance.xlsx`;


            zip.append(
                excelBuffer,
                {
                    name: fileName
                }
            );
        }


        await zip.finalize();

    } catch (error) {

        console.log(error);

        // Only send JSON if ZIP response
        // has not already started
        if (!res.headersSent) {

            res.status(500).json({
                message: error.message
            });
        }
    }
};