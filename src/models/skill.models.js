import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: [true, "Skill Name is required"]
    },
    skillBgColor: {
        type: String
    },
    skillImg: {
        type: String,
        required: [true, "Skill Image is required"]
    }
}, { timestamps: true });

export const Skill = mongoose.model('Skill', skillSchema);
