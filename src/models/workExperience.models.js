import mongoose from 'mongoose';

const workExperienceSchema = new mongoose.Schema(
    {
        workExperienceName: {
            type :String , 
            required: [true, "Work Experience Name is required"]
        },
        workExperienceCompany: {
            type: String, 
        },
        workExperienceDescription: {
            type: String, 

        }
    },
    { timestamps: true }
);

export const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
