import { Timestamp } from 'bson';
import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    name:{type:String ,
        required:true
    },
    tracking:{type :Map,
        of:[Boolean],
        default:{},
    
    }, 
    user_id:{
    type:String,
    required :true},


}, {timestamps:true});


const Habit = mongoose.model('Habit' , habitSchema);

export default Habit ;