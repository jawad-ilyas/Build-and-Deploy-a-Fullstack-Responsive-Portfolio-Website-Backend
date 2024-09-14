import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
    {
        aboutName: {
            type: String, // Changed from 'String' to String
            required: [true, "About Name is required"]
        },
        aboutDescription: {
            type: String, // Changed from "String" to String
            required: [true, "About Description is required"]
        },
        aboutImgUrl: {
            type: String, // Changed from "String" to String
            required: [true, "About Image Url is required"]
        }
    },
    { timestamps: true }
);

export const About = mongoose.model('About', aboutSchema);
