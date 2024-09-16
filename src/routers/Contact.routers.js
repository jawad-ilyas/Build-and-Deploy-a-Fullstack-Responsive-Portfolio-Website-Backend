import { Router } from "express";

import { createContact, fetchContact, deleteContact } from "../controllers/Contact.controller.js"
const router = Router();


router.route("/createContact").post(createContact)
router.route("/fetchContact").get(fetchContact)
router.route("/deleteContact/:id").delete(deleteContact)



export default router;