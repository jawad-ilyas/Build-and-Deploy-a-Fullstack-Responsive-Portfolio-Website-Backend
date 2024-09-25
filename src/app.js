import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin: "https://build-and-deploy-a-fullstack-responsive-portfolio-website-admin.vercel.app/" || "*",
        credentials: true,
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Correct usage of urlencoded middleware
app.use(cookieParser())

import testominalRouter from "./routers/Testominal.routers.js";
import aboutRouter from "./routers/About.routers.js";
import brandRouter from "./routers/Brand.routers.js"
import contactRouter from "./routers/Contact.routers.js"
import skillRouter from "./routers/Skill.routers.js"
import workExperienceRouter from "./routers/workExperience.routers.js"
import WorkRouter from "./routers/Work.routers.js"
import experienceRouter from "./routers/Experience.routers.js"



app.use("/api/v1/testimonial", testominalRouter)
app.use("/api/v1/about", aboutRouter)
app.use("/api/v1/brand", brandRouter)
app.use("/api/v1/contact", contactRouter)
app.use("/api/v1/skill", skillRouter)
app.use("/api/v1/workExperience", workExperienceRouter)
app.use("/api/v1/work", WorkRouter)
app.use("/api/v1/experience", experienceRouter)



export { app }