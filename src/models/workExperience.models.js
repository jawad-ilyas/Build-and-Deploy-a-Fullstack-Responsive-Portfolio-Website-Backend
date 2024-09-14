import mongoose from 'mongoose';

const workExperienceSchema = new mongoose.Schema(
    {
        workExperienceName: {
            required: [true, "Work Experience Name is required"]
        },
        workExperienceCompany: {
            required: [true, "Work Experience Company is required"]
        },
        workExperienceDescription: {
            required: [true, "Work Experience Description is required"]
        }
    },
    { timestamps: true }
);

export const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
