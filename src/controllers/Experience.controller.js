import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"
import { ApiError } from "../utilis/ApiError.utilis.js"
import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { Experience } from "../models/experiences.models.js";
import { WorkExperience } from "../models/workExperience.models.js";

const createExperience = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { year, worksExperience } = req.body;
    console.log("experience Controller :: createExperience :: year", year)
    console.log("experience Controller :: createExperience :: worksExperience", worksExperience)

    if (!year) {
        throw new ApiError(400, "Year is a required field");
    }

    if (!worksExperience) {
        throw new ApiError(400, "WorkExperience ID is a required field");
    }

    const experience = await Experience.create(
        { year, worksExperience }
    )

    res.status(201)
        .json(
            new ApiResponse(200, "New Experience is created ", experience)
        )

})

const fetchExperiences = asyncHandler(async (req, res) => {


    const experiences = await Experience.find().populate("worksExperience");
    res.status(201)
        .json(
            new ApiResponse(200, "Fetch all  Experience ", experiences)
        )
})

const updateExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { year, worksExperience } = req.body;

    if (!id) {
        throw new ApiError(400, "Experience ID is required");
    }

    const verifyExperience = await Experience.findById(id);
    if (!verifyExperience) {
        throw new ApiError(404, "Experience ID not found");
    }

    if (worksExperience) {
        const verifyWorkExperience = await WorkExperience.findById(worksExperience);
        if (!verifyWorkExperience) {
            throw new ApiError(404, "WorkExperience ID does not exist");
        }
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
        id,
        { year, worksExperience },
        { new: true }
    );

    res.status(200).json(
        new ApiResponse(200, "Experience updated successfully", updatedExperience)
    );

})

const deleteExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Experience ID is required");
    }

    const verifyExperience = await Experience.findById(id);
    if (!verifyExperience) {
        throw new ApiError(404, "Experience ID not found");
    }

    const deletedExperience = await Experience.findByIdAndDelete(id);

    res.status(200).json(
        new ApiResponse(200, "Experience deleted successfully", deletedExperience)
    );
})

export { createExperience, fetchExperiences, updateExperience, deleteExperience };
