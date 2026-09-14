import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import employee from "./routes/employee.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", employee);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
