import { Router } from "express";
import { createTestominal, fetchTestominal } from "../controllers/Testominal.controller.js";
import { upload } from "../middlerwares/multer.middleware.js";



const router = Router();




// router.route("/createTestominal").post(upload.single('testimonialImg'), createTestominal)
router.route("/createTestominal").post(upload.single('testimonialImg'), createTestominal)
router.route("/fetchTestominal").get(fetchTestominal)





export default router;