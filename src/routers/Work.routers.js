import { Router } from "express";
import { createWork, fetchWork, updateWork, deleteWork } from "../controllers/Work.controller.js"
import { upload } from "../middlerwares/multer.middleware.js";
const router = Router();



router.route("/createWork").post(upload.single("workImgUrl"), createWork)
router.route("/fetchWork").get(fetchWork)
router.route("/updateWork/:id").put(upload.single("workImgUrl"), updateWork)
router.route("/deleteWork/:id").delete(deleteWork)
export default router;