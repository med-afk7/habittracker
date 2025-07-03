import express from "express";
import habitRoutes from "./routes/habitRoutes.js"
import mongoose from "mongoose";

const PORT = 5000;

const connectDB = async () => {
const conn = await mongoose.connect ("mongodb+srv://ahmedwaleedarman7:T12341234t@cluster0.bfyukfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
if(conn){
console.log("connected successfully");
}}



const app = express(); 

app.use(express.json()); 

app.use("/api/habits" , habitRoutes);



app.listen(PORT , ()=> {
    connectDB();
    console.log("listeneing on port 5000");
})