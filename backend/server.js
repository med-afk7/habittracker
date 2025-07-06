import express from "express";
import habitRoutes from "./routes/habitRoutes.js"
import { connectDB } from "./db/connect.db.js"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from 'cookie-parser'





dotenv.config();
const app = express(); 

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/habits" , habitRoutes);
app.use("/api/auth" , authRoutes);



app.listen(process.env.PORT , ()=> {
    connectDB();
    console.log("listeneing on port " , process.env.PORT);
})