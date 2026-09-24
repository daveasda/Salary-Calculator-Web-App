import { useState } from "react";
import axios from 'axios';
import SalaryCard from "./SalaryCard";
import "../styles/salary.css";

const API_URL =  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    const handleFileInput = (e) => {
    setFile(e.target.files[0]);
    };
    
    const handleUpload = async () => {

        if (!file) {
            return;
        }

        const formData = new FormData();

        formData.append("file", file);


        const response = await axios.post(
            "http://salary-calculator-web-app.onrender.com/api/upload",
            formData
        );


        console.log(response.data.employees);

        setEmployees(response.data.employees);
    };

    const handleDownload = async () => {

        if (!file) return;


        try {

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );


            const response =
                await axios.post(
                    "http://salary-calculator-web-app.onrender.com/api/download",
                    formData,
                    {
                        responseType: "blob"
                    }
                );


            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                "attendance-files.zip";


            link.click();


            window.URL.revokeObjectURL(
                url
            );

        } catch (error) {

            console.error(
                "Download error:",
                error
            );
        }
    };
    
    return (
        <div>
        <div className="parent">
            <h1>N D K Trade Point Salary Calculator</h1>
            <p> Upload attendance file to generate payslip</p>
        </div>

        <div className="parent">
            <input type="file" accept=".xsls, .xls" onChange={handleFileInput} disabled={loading} />
            <p>Supports Excel files</p>
       </div>

       <div className="employee-list">

            {employees.map(employee => (

                <SalaryCard
                    key={employee.id}
                    employee={employee}
                />

            ))}

        </div>
        
        <div className="parent">
        {file && <p>Selected: {file.name}</p>} </div>

        <div className="parent"> <button onClick={handleUpload}>Upload</button> 

        <p> Employees loaded: {employees.length} </p> </div>

        <div className="parent">
        {employees.length > 0 && (

            <button
                className="download-button"
                onClick={handleDownload}
            >
                Download Excel Files
            </button>

        )}
        </div>

        {loading && (<p>Processing your file...</p> )}

        {error && (<p>Error: {error}</p>)}
      
        {result && (
            <div>
                <h2>Success!</h2>

                <p>Employee: {result.employee.name}</p>
                <p>Employee ID: {result.employee.id}</p>
                <p>Department: {result.employee.department}</p>
                <p>Period: {result.employee.period}</p>
                <p>Working days: {result.employee.workingDays}</p>

                <h3>Salary</h3>
                <p>Gross Salary: Rs. {result.salary.grossSalary}</p>
                <p>Final Salary: Rs. {result.salary.finalSalary}</p>
                
                <a href={`${API_URL}/api/download/${result.downloadIndex}`}>
                 Download Payslip
                </a>
            </div>
        )}
    

    </div>
    )
};