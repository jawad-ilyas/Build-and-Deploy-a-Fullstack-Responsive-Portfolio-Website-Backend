import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        company: {
            type: String,
            required: [true, "company is required"]
        },
        feedback: {
            type: String,
            required: [true, "feedback is required"]
        },
        testimonialImg: {
            type: String,
            required: [true, "testimonialImg is required"]
        }
    },
    { timestamps: true }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
