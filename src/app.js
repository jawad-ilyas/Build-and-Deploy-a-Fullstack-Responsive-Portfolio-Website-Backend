import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

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

app.use("/api/v1/users" , (req,res)=>{
        res.send("jawad ilyas")
})



export { app }