import { Router } from "express"
import { createWorkExperience, fetchWorkExperience, updateWorkExperience, deleteWorkExperience } from "../controllers/workExperience.controllers.js"

const router = Router();

router.route("/createWorkExperience").post(createWorkExperience)
router.route("/fetchWorkExperience").get(fetchWorkExperience)
router.route("/updateWorkExperience/:id").put(updateWorkExperience)
router.route("/deleteWorkExperience/:id").delete(deleteWorkExperience)

export default router;