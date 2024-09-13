import { app } from "./src/app.js";
import dotenv from "dotenv"
import { connectDb } from "./src/db/index.db.js";


dotenv.config({
    path: './.env'
})


const portConfiguration = process.env.PORT;
connectDb().
    then(() => {
        app.listen(portConfiguration, () => {
            console.log(`http://localhost:${portConfiguration}`)
        })
    }).catch((error) => {
        console.log("index js :: connect Db :: error ", error)
    })