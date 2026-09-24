function SalaryCard({employee}) {

    const totalOTA =
        employee.totals.otaIn +
        employee.totals.otaOut;

    const rates =
        employee.salary.rates;

    return(
        <div className="salary-card">
            <div className="employee-header">
                <div>
                    <h2> {employee.name} </h2>
                    <p> {employee.department} </p>
                </div>

                <span> {employee.monthLabel} </span>
            </div>

            <h3> Salary Breakdown </h3>
            <div className="salary-heading">
                <span> Item </span>
                <span> Calculation</span>
                <span> Amount (Rs.) </span>
            </div>

            <div className="salary-row">

                <span>Basic Allowance</span>

                <span>
                    {employee.totals.workingDays}
                    {" days × "}
                    {rates.basic}
                </span>

                <strong>
                    {employee.salary.basicAllowance.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row">

                <span>Overtime</span>

                <span>
                    {employee.totals.overtime}
                    {" min × "}
                    {rates.ot}
                </span>

                <strong>
                    {employee.salary.otAllowance.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row">

                <span>Breakfast Allowance</span>

                <span>
                    {employee.totals.breakfast}
                    {" × "}
                    {rates.breakfast}
                </span>

                <strong>
                    {employee.salary.breakfastAllowance.toFixed(2)}
                </strong>

            </div>

           <div className="salary-row">

                <span>Lunch Allowance</span>

                <span>
                    {employee.totals.lunch}
                    {" × "}
                    {rates.lunch}
                </span>

                <strong>
                    {employee.salary.lunchAllowance.toFixed(2)}
                </strong>

            </div>

           <div className="salary-row">

                <span>OTA Allowance</span>

                <span>
                    {totalOTA}
                    {" × "}
                    {rates.ota}
                </span>

                <strong>
                    {employee.salary.otaAllowance.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row">

                <span>Attendance Allowance</span>

                <span>
                    {employee.totals.workingDays}
                    {" × "}
                    {rates.attendance}
                </span>

                <strong>
                    {employee.salary.attendanceAllowance.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row">

                <span>Sunday Allowance</span>

                <span>
                    {employee.totals.sunday}
                    {" × "}
                    {rates.sunday}
                </span>

                <strong>
                    {employee.salary.sundayAllowance.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row bonus-row">

                <span>Zero Late Bonus</span>

                <span>
                    {employee.totals.late === 0
                        ? "0 late minutes ✓"
                        : `${employee.totals.late} late minutes`
                    }
                </span>

                <strong>
                    + {employee.salary.zeroLateBonus.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row bonus-row">

                <span>Zero Short Leave Bonus</span>

                <span>
                    {employee.totals.shortLeave === 0
                        ? "0 short leaves ✓"
                        : `${employee.totals.shortLeave} short leaves`
                    }
                </span>

                <strong>
                    + {employee.salary.zeroShortLeaveBonus.toFixed(2)}
                </strong>

            </div>

            <div className="salary-row penalty-row">

                <span>Late Penalty</span>

                <span>
                    {employee.totals.late}
                    {" min × "}
                    {rates.latePenalty}
                </span>

                <strong>
                    - {employee.salary.latePenalty.toFixed(2)}
                </strong>

            </div>


            <div className="net-salary">

                <span>
                    Final Salary
                </span>

                <strong>
                    Rs. {employee.salary.netSalary}
                </strong>

            </div>

        </div>
    )
}
export default SalaryCard;