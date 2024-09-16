import { Router } from "express";
import { createAbout, deleteAbout, fetchAbout, updateAbout } from "../controllers/About.controller.js";
import { upload } from "../middlerwares/multer.middleware.js";



const router = Router();



router.route("/createAbout").post(upload.single("aboutImgUrl"), createAbout)
router.route("/deleteAbout/:_id").delete(deleteAbout)
router.route("/fetchAbout").get(fetchAbout)
router.route("/updateAbout/:id").put(upload.single("aboutImgUrl"), updateAbout)


export default router;