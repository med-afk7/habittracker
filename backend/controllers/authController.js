import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail , sendResetEmail , sendWelcomeEmail  , sendSuccessResetEmail } from "../mailtrap/emails.js";


export const signup =  async (req,res) => {

    const {email, password , name } = req.body

    try {
        
        if(!email || !password || !name){
            throw new Error ("All fields are required");
        }
        const userAlreadyExists =  await User.findOne({email});
     
        if(userAlreadyExists){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword =  await bcrypt.hash(password, 10);

        const vCode = Math.floor(100000 + Math.random()* 900000).toString();;
        const user = new User({email,
            password:hashedPassword, 
            name ,
            VerificationToken:vCode,
            VerificationTokenExpiresAt:Date.now()+24*60*60*1000
        
        })

        await user.save();

        //jwt token 
        generateTokenAndSetCookie(res, user._id)


         await sendVerificationEmail(user.email, vCode);



        res.status(201).json({
            success:true , 
            message:"User Created successfully" , 
            user :{
                ...user._doc,
                password:undefined
            }
        })



    } catch (error) {
        res.status(500).json({message:error.message})
        
    }


}

export const login =  async (req,res) => {

    const {email , password } =  req.body;

    try {

        const user = await User.findOne({email});

        if(!user ){
            return res.status(400).json({message:"invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(!isPasswordValid){
            return res.status(400).json({message:"invalid credentials"});
        }

        generateTokenAndSetCookie(res , user._id);

        user.lastLogin =  new Date();
        await user.save();

                res.status(200).json({
            success:true , 
            message:"Logged in successfully " , 
            user :{
                ...user._doc,
                password:undefined
            }
        })

        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:error.message})
    }


    
}

export const logout=  async (req,res) => {
    res.clearCookie("token")
    res.status(200).json({message:"Logged out successfully"})
}


export const verifyemail = async (req , res ) =>{
    const {code} = req.body;

    try {

        const user = await User.findOne({
            VerificationToken:code 
            ,VerificationTokenExpiresAt:{$gt:Date.now()}
        })
        
        if(!user){
            return res.status(400).json({message:"invalid or expired verification code"})
        }

        user.isVerified = true;
        user.VerificationToken = undefined;
        user.VerificationTokenExpiresAt=undefined;
        await user.save();

        await sendWelcomeEmail(user.email , user.name);

        res.status(200).json({message: "email verified successfully" , user :{...user._doc , password:undefined} })

    } catch (error) {
        console.error(error)
        res.status(500).json({message:error.message})
        
    }


}

export const forgotPassword = async(req,res) => {
    const {email} = req.body ;

    

    try {
        const user = await User.findOne({email});
        if(!user){
             return res.status(400).json({message:"invalid email"})
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken ;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();


        await sendResetEmail(email , `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
 res.status(200).json({message: "Email sent " , user :{...user._doc , password:undefined} })

    } catch (error) {
         console.error(error)
        res.status(500).json({message:error.message})
        
    }

}


export const resetPassword = async (req,res) =>{



    try {
        const {token} = req.params;
        const {password} = req.body;

        const user  = await User.findOne({resetPasswordToken:token , resetPasswordExpiresAt:{$gt:Date.now() }})

        if(!user){
            return res.status(400).json({message:"invalid or expired token "})
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken= undefined;
         user.resetPasswordExpiresAt =undefined;


 await user.save();


 await sendSuccessResetEmail (user.email);
 return res.status(200).json({ message: "Password reset successful." });

        } catch (error) {
           console.error(error)
        res.status(500).json({message:error.message})
    }
}


export const checkAuth = async (req ,res) =>{

try {
    
    const user  = await User.findById(req.userId).select("-password");
    if(!user){
         return res.status(400).json({message:"User not found"})
    }
res.status(200).json({user })

    } catch (error) {
         console.error(error)
        res.status(500).json({message:error.message})
        
    }

}