
import mongoose from "mongoose";

const connectDb = () => {

    try {
        const connection = mongoose.connect("mongodb+srv://jawaddb:jawaddb@cluster0.6erxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        return connection;
    } catch (error) {
        console.log("index db :: connect db :: error ", error)
    }

}


export { connectDb }