import express from "express";

import { get_all, delete_habit , update_habit, new_habit , updateHabitTracking} from "../controllers/habitController.js";


const router = express.Router();


router.get("/" ,get_all );
router.delete("/:id" , delete_habit );
router.post("/" , new_habit);
router.put("/:id", update_habit);
router.put("/:id/tracking", updateHabitTracking);


export default router ;