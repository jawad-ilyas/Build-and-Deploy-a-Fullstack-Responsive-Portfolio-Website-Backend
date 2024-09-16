import mongoose from "mongoose";


const brandSchema = new mongoose.Schema({


    brandImgUrl: {
        type: String,
        required: [true, "Brand Image Url is required "]
    },
    brandName: {
        type: String,
        required: [true, "brand Name is required "]
    },

}, { timestamps: true })


export const Brand = mongoose.model("Brand", brandSchema)