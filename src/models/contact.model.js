import mongoose from "mongoose";

const contactSchema = new mongoose.model({
    contactName: {
        type: String,
        required: [true, "Contact Name is required "]
    },
    contactEmail: {
        type: String,
        required: [true, "Contact email is required "]
    },
    contactMessage: {
        type: String,
        required: [true, "Contact message is required "]
    }
}, { timestamps: true })

export const Contact = mongoose.model("Contact", contactSchema)