import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import testominalRouter from "./routers/Testominal.routers.js";

const app = express();

app.use(cors(
    {
        origin: process.env.ORIGIN,
        credentials: true,
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Correct usage of urlencoded middleware
app.use(cookieParser())





app.use("/api/v1/testominal", testominalRouter)



export { app }