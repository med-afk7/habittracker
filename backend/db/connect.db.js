
import mongoose from "mongoose";



 export const connectDB = async () => {
 
const conn = await mongoose.connect (process.env.MONGO_URI);
if(conn){
console.log("connected successfully");
}
else{
    console.log("error connecting with the db");
    process.exit(1)
}


}
