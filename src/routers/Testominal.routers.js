import { Router } from "express";
import { createTestimonial, deleteTestimonial, fetchTestimonial, updateTestimonial } from "../controllers/Testominal.controller.js";
import { upload } from "../middlerwares/multer.middleware.js";



const router = Router();




// router.route("/createTestominal").post(upload.single('testimonialImg'), createTestominal)
router.route("/createTestimonial").post(upload.single('testimonialImg'), createTestimonial)
router.route("/fetchTestimonial").get(fetchTestimonial)
router.route("/deleteTestimonial/:_id").delete(deleteTestimonial)
router.route("/updateTestimonial/:_id").put(upload.single('testimonialImg'), (updateTestimonial))





export default router;