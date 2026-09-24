const MONTHS = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
];


// =====================================
// SALARY RATES FOR EACH EMPLOYEE
// =====================================

const SALARY_RATES = {

    "Abeykoon D W G R": {
        basic: 2500,
        ot: 5,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Gayan Kolitha M A": {
        basic: 0,
        ot: 0,
        breakfast: 0,
        lunch: 0,
        ota: 0,
        attendance: 0,
        sunday: 0,
        zeroLateBonus: 0,
        zeroShortLeaveBonus: 0,
        latePenalty: 0,
        addition: 0
    },

    "Muhundiram D": {
        basic: 2000,
        ot: 5,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Priyantha Kumara M G R": {
        basic: 2000,
        ot: 5,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Madhushan U V I": {
        basic: 1500,
        ot: 5,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 4,
        addition: 0
    },

    "Anuruddhika Kumari K K N": {
        basic: 1500,
        ot: 0,
        breakfast: 0,
        lunch: 0,
        ota: 150,
        attendance: 0,
        sunday: 0,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 0,
        addition: 0
    },

    "Ishara Lakshan R M": {
        basic: 1500,
        ot: 5,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 4,
        addition: 0
    },

    "Wijekumara N": {
        basic: 2000,
        ot: 5,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Liyanage L A P C": {
        basic: 1750,
        ot: 0,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 0,
        addition: 45000
    },

    "Abeykoon D G S": {
        basic: 1750,
        ot: 0,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 0,
        addition: 25000
    },

    "Pushpakumara A M P": {
        basic: 1750,
        ot: 0,
        breakfast: 150,
        lunch: 200,
        ota: 150,
        attendance: 300,
        sunday: 300,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 0,
        addition: 10000
    },

    "Abeyrathna K D U I": {
        basic: 3000,
        ot: 5,
        breakfast: 0,
        lunch: 0,
        ota: 0,
        attendance: 0,
        sunday: 0,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Sri Buddhadasa D V D D D": {
        basic: 3000,
        ot: 5,
        breakfast: 0,
        lunch: 0,
        ota: 0,
        attendance: 0,
        sunday: 0,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Puvendran K": {
        basic: 2500,
        ot: 5,
        breakfast: 0,
        lunch: 0,
        ota: 0,
        attendance: 0,
        sunday: 0,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    },

    "Diljan A": {
        basic: 3000,
        ot: 5,
        breakfast: 0,
        lunch: 0,
        ota: 0,
        attendance: 0,
        sunday: 0,
        zeroLateBonus: 500,
        zeroShortLeaveBonus: 500,
        latePenalty: 5,
        addition: 0
    }

};


// =====================================
// CONVERT TIME TO MINUTES
// =====================================

function parseTime(time) {

    if (!time) return null;

    const parts = String(time)
        .trim()
        .replace(/\./g, ":")
        .split(":");

    if (parts.length < 2) return null;

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    return hours * 60 + minutes;
}


// =====================================
// READ ATTENDANCE FILE
// =====================================

function processAttendance(buffer) {

    const html = buffer.toString("utf-8");

    const section =
        /class="Daily_Report"([\s\S]*?)<\/table>/.exec(html);

    if (!section) {
        throw new Error("Attendance table not found");
    }


    const cells = [
        ...section[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)
    ].map(match =>
        match[1]
            .replace(/<[^>]+>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .trim()
    );


    const people = new Map();


    for (let i = 0; i < cells.length; i += 20) {

        const row = cells.slice(i, i + 20);

        if (row.length < 20) continue;


        const date = row[6];

        if (!/^\d{4}-\d{2}-\d{2}/.test(date || "")) {
            continue;
        }


        const personId = row[1];
        const name = row[2];
        const department = row[3];


        if (!people.has(personId)) {

            people.set(personId, {
                id: personId,
                name: name,
                department: department,
                days: []
            });
        }


        people.get(personId).days.push({

            date: row[6].slice(0, 10),

            day: row[7],

            timetable: row[8],

            checkIn: row[9],

            checkOut: row[10]
        });
    }


    const employees =
        [...people.values()];


    return employees.map(analyzeEmployee);
}


// =====================================
// CALCULATE SALARY
// =====================================

function calculateSalary(employeeName, totals) {

    const cleanName = employeeName.trim();

    const rates = SALARY_RATES[cleanName];


    // Employee has no salary rates yet
    if (!rates) {
    throw new Error(
        `Salary rates not found for: "${cleanName}"`
    );
}

    const totalOTA =
        totals.otaIn +
        totals.otaOut;


    // Allowances
    const basicAllowance =
        rates.basic *
        totals.workingDays;


    const otAllowance =
        rates.ot *
        totals.overtime;


    const breakfastAllowance =
        rates.breakfast *
        totals.breakfast;


    const lunchAllowance =
        rates.lunch *
        totals.lunch;


    const otaAllowance =
        rates.ota *
        totalOTA;


    const attendanceAllowance =
        rates.attendance *
        totals.workingDays;


    const sundayAllowance =
        rates.sunday *
        totals.sunday;


    // Bonus if no late minutes
    const zeroLateBonus =
        totals.late === 0
            ? rates.zeroLateBonus
            : 0;


    // Bonus if no short leave
    const zeroShortLeaveBonus =
        totals.shortLeave === 0
            ? rates.zeroShortLeaveBonus
            : 0;


    // Late deduction
    const latePenalty =
        rates.latePenalty *
        totals.late;

    const basicM = rates.addition;

    // Total before deductions
    const grossSalary =
        basicAllowance +
        otAllowance +
        breakfastAllowance +
        lunchAllowance +
        otaAllowance +
        attendanceAllowance +
        sundayAllowance +
        zeroLateBonus +
        zeroShortLeaveBonus + basicM;


    // Final salary
    const netSalary =
        grossSalary -
        latePenalty;


    return {

        rates: rates,

        basicAllowance,

        otAllowance,

        breakfastAllowance,

        lunchAllowance,

        otaAllowance,

        attendanceAllowance,

        sundayAllowance,

        zeroLateBonus,

        zeroShortLeaveBonus,

        latePenalty,

        basicM,

        grossSalary,

        netSalary
    };
}


// =====================================
// ANALYZE ONE EMPLOYEE
// =====================================

function analyzeEmployee(employee) {

    let lateTotal = 0;

    let breakfastTotal = 0;

    let lunchTotal = 0;

    let overtimeTotal = 0;

    let workingTotal = 0;

    let otaInTotal = 0;

    let otaOutTotal = 0;

    let sundayTotal = 0;

    let shortLeaveTotal = 0;


    const records = [];


    // =================================
    // GO THROUGH EACH DAY
    // =================================

    for (const day of employee.days) {

        const checkIn =
            parseTime(day.checkIn);

        const checkOut =
            parseTime(day.checkOut);


        let late = 0;

        let breakfast = 0;

        let lunch = 0;

        let workingDay = 0;

        let otaIn = 0;

        let otaOut = 0;

        let sunday = 0;

        let shortLeave = 0;

        let overtime = 0;


        // -----------------------------
        // NORMAL START / END TIME
        // -----------------------------

        let normalStart = null;

        let normalEnd = null;


        const timetable =
            day.timetable || "";


        const match =
            timetable.match(
                /\((.*?)\-(.*?)\)/
            );


        if (match) {

            normalStart =
                parseTime(match[1]);

            normalEnd =
                parseTime(match[2]);
        }


        // =================================
        // EMPLOYEE CAME TO WORK
        // =================================

        if (checkIn !== null) {

            workingDay = 1;


            // -----------------------------
            // LATE
            // -----------------------------

            if (
                normalStart !== null &&
                checkIn > normalStart
            ) {

                late =
                    checkIn -
                    normalStart;
            }


            // -----------------------------
            // BREAKFAST
            // -----------------------------

            if (
                checkIn <
                8 * 60 + 15
            ) {

                breakfast = 1;
            }


            // -----------------------------
            // LUNCH
            // -----------------------------

            if (
                checkOut !== null &&
                checkIn <= 14 * 60 &&
                checkOut >= 14 * 60
            ) {

                lunch = 1;
            }


            // -----------------------------
            // MORNING OTA
            // -----------------------------

            if (
                normalStart !== null &&
                checkIn <= normalStart
            ) {

                otaIn = 1;
            }


            // -----------------------------
            // EVENING OTA
            // -----------------------------

            if (
                checkOut !== null &&
                normalEnd !== null &&
                checkOut >= normalEnd
            ) {

                otaOut = 1;
            }


            // -----------------------------
            // SUNDAY
            // -----------------------------

            if (
                day.day
                    .toLowerCase()
                    .startsWith("sun")
            ) {

                sunday = 1;
            }


            // -----------------------------
            // SHORT LEAVE
            // -----------------------------

            if (
                checkOut !== null &&
                checkOut <
                16 * 60 + 30
            ) {

                shortLeave = 1;
            }


            // -----------------------------
            // OVERTIME
            // -----------------------------

            if (
                checkOut !== null &&
                normalEnd !== null &&
                checkOut > normalEnd
            ) {

                overtime =
                    checkOut -
                    normalEnd;
            }
        }


        // =================================
        // ADD TO MONTHLY TOTALS
        // =================================

        lateTotal += late;

        breakfastTotal += breakfast;

        lunchTotal += lunch;

        overtimeTotal += overtime;

        workingTotal += workingDay;

        otaInTotal += otaIn;

        otaOutTotal += otaOut;

        sundayTotal += sunday;

        shortLeaveTotal +=
            shortLeave;


        // =================================
        // SAVE DAILY RECORD
        // =================================

        records.push({

            date: day.date,

            day: day.day,

            checkIn: day.checkIn,

            late: late,

            otaIn: otaIn,

            breakfast: breakfast,

            checkOut: day.checkOut,

            overtime: overtime,

            otaOut: otaOut,

            lunch: lunch,

            workingDay: workingDay,

            sunday: sunday,

            shortLeave: shortLeave
        });
    }


    // =====================================
    // MONTH NAME
    // =====================================

    const firstDate =
        employee.days[0]?.date;


    let monthLabel = "";


    if (firstDate) {

        const year =
            firstDate.slice(0, 4);


        const monthNumber =
            Number(
                firstDate.slice(5, 7)
            );


        monthLabel =
            `${year} ${MONTHS[monthNumber - 1]}`;
    }


    // =====================================
    // ATTENDANCE TOTALS
    // =====================================

    const totals = {

        late: lateTotal,

        otaIn: otaInTotal,

        breakfast: breakfastTotal,

        overtime: overtimeTotal,

        otaOut: otaOutTotal,

        lunch: lunchTotal,

        workingDays: workingTotal,

        sunday: sundayTotal,

        shortLeave: shortLeaveTotal
    };


    // =====================================
    // CALCULATE SALARY
    // =====================================

    const salary =
        calculateSalary(
            employee.name,
            totals
        );


    // =====================================
    // RETURN EMPLOYEE
    // =====================================

    return {

        id: employee.id,

        name: employee.name,

        department:
            employee.department,

        monthLabel:
            monthLabel,

        // Number of calendar days
        workingDays:
            employee.days.length,

        records:
            records,

        totals:
            totals,

        salary:
            salary
    };
}


export default processAttendance;