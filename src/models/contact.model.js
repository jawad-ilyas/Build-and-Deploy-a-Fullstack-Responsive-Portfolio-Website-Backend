import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        contactName: {
            type: String,
            required: [true, "Contact Name is required "]
        },
        contactEmail: {
            type: String,
            required: [true, "Contact email is required "]
        },
        contactMessage: {
            type: String
        }
    },
    { timestamps: true })

export const Contact = mongoose.model("Contact", contactSchema)