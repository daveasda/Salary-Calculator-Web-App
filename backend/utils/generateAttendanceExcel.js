import ExcelJS from "exceljs";


async function generateAttendanceExcel(employee) {

    const workbook = new ExcelJS.Workbook();

    const sheet =
        workbook.addWorksheet("Attendance");


    // COLUMN WIDTHS
    sheet.columns = [
        { width: 14 }, // DATE
        { width: 10 }, // DAY
        { width: 12 }, // IN
        { width: 9 },  // LATE
        { width: 8 },  // OTA
        { width: 8 },  // BF
        { width: 12 }, // OUT
        { width: 9 },  // OT
        { width: 8 },  // OTA
        { width: 8 },  // LUN
        { width: 8 }   // W
    ];


    // EMPLOYEE HEADING
    sheet.mergeCells("A1:K1");

    sheet.getCell("A1").value =
        `${employee.name.toUpperCase()} - ${employee.department.toUpperCase()} - ${employee.id}`;

    sheet.getCell("A1").font = {
        name: "Calibri",
        size: 12,
        bold: true
    };


    // MONTH HEADING
    sheet.mergeCells("A2:K2");

    sheet.getCell("A2").value =
        `${employee.monthLabel} - No of Working Days - ${employee.workingDays}`;

    sheet.getCell("A2").font = {
        name: "Calibri",
        size: 11,
        bold: true
    };


    // COLUMN HEADINGS
    const headerRow =
        sheet.getRow(3);

    headerRow.values = [
        "DATE",
        "DAY",
        "IN",
        "LATE",
        "OTA",
        "BF",
        "OUT",
        "OT",
        "OTA",
        "LUN",
        "W"
    ];

    headerRow.font = {
        name: "Calibri",
        size: 11,
        bold: true
    };


    // DAILY ATTENDANCE
    for (const record of employee.records) {

        const row = sheet.addRow([

            record.date,
            record.day,

            record.checkIn || "-",

            record.late,
            record.otaIn,
            record.breakfast,

            record.checkOut || "-",

            record.overtime,
            record.otaOut,
            record.lunch,
            record.workingDay
        ]);


        // Sunday = yellow
        const isSunday =
            record.day
                ?.toLowerCase()
                .startsWith("sun");


        if (isSunday) {

            row.eachCell(
                { includeEmpty: true },
                cell => {

                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: {
                            argb: "FFFFFF00"
                        }
                    };
                }
            );
        }


        // Absent = green
        else if (record.workingDay === 0) {

            row.eachCell(
                { includeEmpty: true },
                cell => {

                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: {
                            argb: "FF92D050"
                        }
                    };
                }
            );
        }


        // Late check-in = red
        if (record.late > 0) {

            row.getCell(3).font = {
                name: "Calibri",
                size: 11,
                bold: true,
                color: {
                    argb: "FFC00000"
                }
            };
        }
    }



    // TOTAL ROW
    const totalRow = sheet.addRow([

        "TOTAL",                       // DATE
        "",                            // DAY
        "",                            // IN

        employee.totals.late,          // LATE

        employee.totals.otaIn,         // OTA

        employee.totals.breakfast,     // BF

        "",                            // OUT

        employee.totals.overtime,      // OT

        employee.totals.otaOut,        // OTA

        employee.totals.lunch,         // LUN

        employee.totals.workingDays    // W
    ]);


    totalRow.font = {
        name: "Calibri",
        size: 11,
        bold: true
    };


    // EMPTY ROW
    sheet.addRow([]);


    // SUMMARY
    const summaryStart =
        sheet.rowCount + 1;


    sheet.addRow([
        "SUMMARY",
        "VALUE"
    ]);


    sheet.addRow([
        "Working Days",
        employee.totals.workingDays
    ]);


    sheet.addRow([
        "Late Minutes",
        employee.totals.late
    ]);


    sheet.addRow([
        "OTA",
        employee.totals.otaIn +
        employee.totals.otaOut
    ]);


    sheet.addRow([
        "Breakfast",
        employee.totals.breakfast
    ]);


    sheet.addRow([
        "Overtime Minutes",
        employee.totals.overtime
    ]);


    sheet.addRow([
        "Lunch",
        employee.totals.lunch
    ]);


    sheet.addRow([
        "Sunday",
        employee.totals.sunday
    ]);


    sheet.addRow([
        "Short Leave",
        employee.totals.shortLeave
    ]);


    sheet.getRow(summaryStart).font = {
        name: "Calibri",
        size: 11,
        bold: true
    };

     // EMPTY ROW
    sheet.addRow([]);

    // SALARY
    const salaryStart =
        sheet.rowCount + 1;

    sheet.addRow([
        "SALARY BREAKDOWN",
        "AMOUNT"
    ]);

    console.log("Salary:", employee.salary);

    sheet.addRow([
        "Basic Allowance",
        employee.salary.basicAllowance
    ]);

    sheet.addRow([
        "OT Allowance",
        employee.salary.otAllowance
    ]);

    
    sheet.addRow([
        "Breakfast Allowance",
        employee.salary.breakfastAllowance
    ]);

    sheet.addRow([
        "Lunch Allowance",
        employee.salary.lunchAllowance
    ]);

    
    sheet.addRow([
        "OTA Allowance",
        employee.salary.otaAllowance
    ]);

    sheet.addRow([
        "Attendance Allowance",
        employee.salary.attendanceAllowance
    ]);

    sheet.addRow([
        "Sunday Allowance",
        employee.salary.sundayAllowance
    ]);

    sheet.addRow([
        "Zero Late Bonus",
        employee.salary.zeroLateBonus
    ]);

    sheet.addRow([
        "Zero Short Leave Bonus",
        employee.salary.zeroShortLeaveBonus
    ]);

    sheet.addRow([
        "Late Penalty",
        employee.salary.latePenalty
    ]);

    sheet.addRow([
        "Basic M",
        employee.salary.basicM
    ]);

    sheet.addRow([
        "Net Salary",
        employee.salary.netSalary
    ]);

    sheet.getRow(salaryStart).font = {
        name: "Calibri",
        size: 11,
        bold: true
    };

    // ALL CELL FORMATTING
    sheet.eachRow(row => {

        row.eachCell(
            { includeEmpty: true },
            cell => {

                cell.alignment = {
                    horizontal: "center",
                    vertical: "middle"
                };


                cell.border = {

                    top: {
                        style: "thin",
                        color: { argb: "FF000000" }
                    },

                    left: {
                        style: "thin",
                        color: { argb: "FF000000" }
                    },

                    bottom: {
                        style: "thin",
                        color: { argb: "FF000000" }
                    },

                    right: {
                        style: "thin",
                        color: { argb: "FF000000" }
                    }
                };


                // Keep red late formatting
                if (!cell.font?.color) {

                    cell.font = {
                        name: "Calibri",
                        size: 11,
                        bold: cell.font?.bold || false
                    };
                }
            }
        );
    });


    // CREATE EXCEL FILE
    const buffer =
        await workbook.xlsx.writeBuffer();

    return buffer;
}


export default generateAttendanceExcel;