import { useState } from "react";
import axios from 'axios';

const API_URL =  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleFileInput = (e) => {
    setFile(e.target.files[0]);
    };
    
    const handleUpload = async () => {
        const response = await axios.post("http://localhost:5000/api/upload");
        console.log(response.data);
    }

    return (
        <div>
        <div>
            <h1> Salary Calculator</h1>
            <p> Upload attendance file to generate payslip</p>
        </div>

        <div>
            <input type="file" accept=".xsls, .xls" onChange={handleFileInput} disabled={loading} />
            <p>Supports .xls and .xlsx files</p>
       </div>
        
        {file && <p>Selected: {file.name}</p>}

        <button onClick={handleUpload}>Upload</button>

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