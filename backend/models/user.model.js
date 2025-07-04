import { Timestamp } from 'bson';
import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,
    password:{
        type:String,
        required:true

    } ,
    name:{type:String,
        required:true
    },
    lastLogin:{
        type:Date,
        default:Date.now

    }
,
    isVerified:{
        type:Boolean,
        default:false
    }
    ,
    resetPasswordToked:String,
    resetPasswordExpiresAt:Date,
    VerificationToken:String,
    VerificationTokenExpiresAt:Date,


    }, {timestamps:true});


const User = mongoose.model('user' , userSchema);



export default User ;