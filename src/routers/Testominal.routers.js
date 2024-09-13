import { Router } from "express";
import { createTestominal } from "../controllers/Testominal.controller.js";
import { upload } from "../middlerwares/multer.middleware.js";



const router = Router();




router.route("/createTestominal").post(upload.single('testimonialImg'), createTestominal)



export default router;