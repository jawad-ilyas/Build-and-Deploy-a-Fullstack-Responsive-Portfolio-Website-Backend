import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
    workName: {
        type: String,
        required: [true, "Work Name is required"]
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
        required: [true, "Work Code Link is required"]
    },
    workImgUrl: {
        type: String,
        required: [true, "Work Image URL is required"]
    },
    tags: [
        {
            type: String
        }
    ]
}, { timestamps: true });

export const Work = mongoose.model('Work', WorkSchema);
