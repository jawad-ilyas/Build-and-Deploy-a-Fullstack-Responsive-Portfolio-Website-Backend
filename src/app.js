import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin: process.env.ORIGIN || "*",
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



app.use("/api/v1/testimonial", testominalRouter)
app.use("/api/v1/about", aboutRouter)
app.use("/api/v1/brand", brandRouter)
app.use("/api/v1/contact", contactRouter)
app.use("/api/v1/skill", skillRouter)



export { app }