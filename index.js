import { app } from "./src/app.js";
import dotenv from "dotenv"


dotenv.config({
    path: './.env'
})


const portConfiguration = process.env.PORT;
app.listen(portConfiguration, () => {
    console.log(`http://localhost:${portConfiguration}`)
})