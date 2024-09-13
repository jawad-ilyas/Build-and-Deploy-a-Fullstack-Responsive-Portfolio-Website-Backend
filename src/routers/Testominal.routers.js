import { Router } from "express";
import { createTestominal } from "../controllers/Testominal.controller.js";



const router = Router();




router.route("/createTestominal").post(createTestominal)



export default router;