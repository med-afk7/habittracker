import express from "express";

import { get_all, delete_habit , update_habit, new_habit , updateHabitTracking} from "../controllers/habitController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.get("/" ,verifyToken,get_all );
router.delete("/:id" , delete_habit );
router.post("/" , verifyToken,new_habit);
router.put("/:id", update_habit);
router.put("/:id/tracking", updateHabitTracking);


export default router ;