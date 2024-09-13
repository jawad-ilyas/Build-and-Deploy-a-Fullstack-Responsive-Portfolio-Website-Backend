
import mongoose from "mongoose";

const connectDb = () => {

    try {
        const connection = mongoose.connect(process.env.MONGODB_URI);
        return connection;
    } catch (error) {
        console.log("index db :: connect db :: error ", error)
    }

}


export { connectDb }