import Habit from "../models/product.model.js";
import mongoose from "mongoose";


export const get_all = async (req , res) => {

  const user_id = req.userId

    try {

       const habits =  await Habit.find({user_id});
       
       res.status(200).json(habits);
        
    } catch (error) {
        console.log("error" , error.message);
        res.status(500).json({ error: error.message });
        
    }
}

export const new_habit= async (req , res) => {
    try{
    
    const {name} = req.body ;
   


   if(!name){
   return res.status(400).json({error:'Name is required'});
   }

const currentWeek = getWeek();

   const tracking = new Map();
   tracking.set(currentWeek,[false,false,false,false,false,false,false]);

   const newHabit = new Habit({
    name, tracking,user_id:req.userId
   })

    await newHabit.save();
     res.status(201).json(newHabit);
    }
    catch(error){
        console.error("Error creating habit:", error.message);
    res.status(500).json({ error: error.message });

    }
    
  
}

export const delete_habit= async (req , res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        
        return res.status(404).json({message:"Invalid habit id "})
    }


    
    try {
        await Habit.findByIdAndDelete(id)
        res.status(200).json({message:"Deleted"});
        
    } catch (error) {
        res.status(500).json({message:"failed to delete"});
        
    }
}

export const update_habit = async (req , res) => {

    
    try {
        
    } catch (error) {
        
    }
}


export const updateHabitTracking = async (req, res) => {
  const { id } = req.params;
  const { week, trackingArray } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid habit ID" });
  }

  const isValidWeekFormat = /^\d{4}-W\d{1,2}$/.test(week);
  if (!isValidWeekFormat) {
    return res.status(400).json({ message: "Week format must be YYYY-W##" });
  }


  try {
    const habit = await Habit.findById(id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.tracking.set(week, trackingArray);

    await habit.save();

    res.status(200).json({ message: "Tracking updated successfully", habit });
  } catch (error) {
    console.error("Error updating tracking:", error);
    res.status(500).json({ message: "Failed to update tracking" });
  }
};



function getWeek(){
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - jan1) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;

}

