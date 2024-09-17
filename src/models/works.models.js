import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
    workName: {
        type: String,
        required: [true, "Work Name is required"],
        lowercase: true, // Automatically converts value to lowercase


    },
    workDescription: {
        type: String,
        required: [true, "Work Description is required"]
    },
    workProjectLink: {
        type: String,
        required: [true, "Work Project Link is required"]
    },
    workCodeLink: {
        type: String,

    },
    workImgUrl: {
        type: String,
        required: [true, "Work Image URL is required"]
    },
    tags: [
        {
            type: String,
            lowercase: true, // Automatically converts value to lowercase

        }
    ]
}, { timestamps: true });

export const Work = mongoose.model('Work', WorkSchema);
