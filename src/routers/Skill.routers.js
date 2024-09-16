import { Router } from "express";

import { createSkill, fetchSkill, updateSkill, deleteSkill } from "../controllers/Skill.controller.js"
import { upload } from "../middlerwares/multer.middleware.js";
const router = Router();


router.route("/createSkill").post(upload.single("skillImg"), createSkill)
router.route("/fetchSkill").get(fetchSkill)
router.route("/updateSkill/:id").put(upload.single("skillImg"), updateSkill)
router.route("/deleteSkill/:id").delete(deleteSkill)



export default router;