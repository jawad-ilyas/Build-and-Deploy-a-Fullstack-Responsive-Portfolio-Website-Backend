import { app } from "./src/app.js";
import dotenv from "dotenv"
import { connectDb } from "./src/db/index.db.js";


dotenv.config({
    path: './.env'
})


const portConfiguration = process.env.PORT;
connectDb()

app.listen(portConfiguration, () => {
    console.log(`http://localhost:${portConfiguration}`)
})
