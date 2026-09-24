# NDK Trade Point Salary Calculator

A web application that processes employee attendance Excel files and automatically calculates salary allowances, deductions, and final salaries.

## Features

- Upload Excel attendance files
- Calculate working days, late minutes and overtime
- Calculate breakfast, lunch, OTA, attendance and Sunday allowances
- Calculate bonuses and late penalties
- Display salary breakdowns for each employee
- Generate individual employee Excel reports
- Download all Excel reports as a ZIP file

## Screenshot
<img width="1022" height="462" alt="landing page" src="https://github.com/user-attachments/assets/9cedcd6b-ee2b-49c3-ad98-cb1122881c14" />

<img width="1920" height="869" alt="calculated-salary" src="https://github.com/user-attachments/assets/ab757079-ceea-41a7-a597-029f37dddf9c" />

<img width="803" height="648" alt="image" src="https://github.com/user-attachments/assets/dcb84469-e91d-4eb3-b0bb-6bed76e50ff3" />


![Salary Calculator](screenshots/calculated-salary.png)

## Tech Stack

**Frontend:** React, JavaScript, CSS, Axios, Vite  
**Backend:** Node.js, Express, Multer, ExcelJS, Archiver  
**Deployment:** Render

## Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment

The application is hosted on Render:

- Frontend — Render Static Site
- Backend — Render Web Service

## Author

Developed by Devni Dharmasooriya
