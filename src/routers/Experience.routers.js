import express from 'express';
import { createExperience, fetchExperiences, updateExperience, deleteExperience } from '../controllers/Experience.controller.js';

const router = express.Router();

router.route("/createExperience").post(createExperience)
router.route("/fetchExperiences").get(fetchExperiences)
router.route("/updateExperience/:id").put(updateExperience)
router.route("/deleteExperience/:id").delete(deleteExperience)


export default router;
