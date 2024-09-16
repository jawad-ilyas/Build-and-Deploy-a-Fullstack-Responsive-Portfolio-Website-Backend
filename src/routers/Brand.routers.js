import { Router } from "express";
import { createBrand, deleteBrand, updateBrand, fetchBrand } from "../controllers/Brand.controller.js"
import { upload } from "../middlerwares/multer.middleware.js";

const router = Router();



router.route("/createBrand").post(upload.single("brandImgUrl"), createBrand)
router.route("/fetchBrand").get(fetchBrand)
router.route("/updateBrand/:id").put(upload.single("brandImgUrl"), updateBrand)
router.route("/deleteBrand/:id").delete(deleteBrand)


export default router;