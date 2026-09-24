import processAttendance from "../utils/processAttendance.js";
import generateAttendanceExcel from "../utils/generateAttendanceExcel.js";

import { ZipArchive } from "archiver";


export const uploadFile = async (req, res) => {

    try {

        // Process uploaded attendance file
        const employees = processAttendance(req.file.buffer);

        // Tell browser we are sending a ZIP
        res.setHeader(
            "Content-Type",
            "application/zip"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="attendance-files.zip"'
        );


        // Create ZIP
        const zip = new ZipArchive();

        zip.pipe(res);
       
        // Generate Excel for every employee
        for (const employee of employees) {

            const excelBuffer =
                await generateAttendanceExcel(employee);

            const fileName =
                `${employee.name} ${employee.monthLabel} attendance.xlsx`;

            zip.append(excelBuffer, {
                name: fileName
            });
        }


        // Finish ZIP
        await zip.finalize();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};