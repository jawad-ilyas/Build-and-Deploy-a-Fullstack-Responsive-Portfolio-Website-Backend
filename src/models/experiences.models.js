import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
    {
        year: {
            type: String,
            required: [true, "Year is required field"]
        },
        worksExperience: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "WorkExperience"
            }
        ]
    },
    { timestamps: true }
);

export const Experience = mongoose.model('Experience', ExperienceSchema);
