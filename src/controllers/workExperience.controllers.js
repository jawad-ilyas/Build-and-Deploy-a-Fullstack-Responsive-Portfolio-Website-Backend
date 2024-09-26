import { asyncHandler } from "../utilis/AsyncHandler.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.utilis.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { WorkExperience } from "../models/workExperience.models.js";


const createWorkExperience = asyncHandler(async (req, res) => {

    const { workExperienceName, workExperienceCompany, workExperienceDescription } = req.body;

    console.log("Work Experience Controllers :: createWorkExperience :: workExperienceName", workExperienceName)
    console.log("Work Experience Controllers :: createWorkExperience :: workExperienceCompany", workExperienceCompany)
    console.log("Work Experience Controllers :: createWorkExperience :: workExperienceDescription", workExperienceDescription)

    if (
        [workExperienceName, workExperienceCompany].some(field => !field || field.trim() === "")
    ) {
        throw new ApiError(404, "All Fields are required")
    }

    const workExperience = await WorkExperience.create({
        workExperienceName,
        workExperienceCompany,
        workExperienceDescription: workExperienceDescription || ""
    })

    res.status(201)
        .json(
            new ApiResponse(201, " New Work Experience is Created ", workExperience)
        )

})

const fetchWorkExperience = asyncHandler(async (req, res) => {

    const workExperiences = await WorkExperience.find();

    res.status(200)
        .json(
            new ApiResponse(200, " All Work Experience ", workExperiences)
        )
})

const updateWorkExperience = asyncHandler(async (req, res) => {

    const { id } = req.params;
    console.log("Work Experience Controller :: deleteWorkExperience :: id", id);

    if (!id) {
        throw new ApiError(400, "Work Experience delete id is not present into params ", id)
    }

    const verifyId = await WorkExperience.findById(
        { _id: id }
    )
    console.log("Work Experience Controller :: deleteWorkExperience :: verifyId", verifyId);

    if (verifyId === null) {
        throw new ApiError(400, "Work Experience delete id is not present into db ", id)
    }
    const { workExperienceName, workExperienceCompany, workExperienceDescription } = req.body;

    // console.log("Work Experience Controllers :: updateWorkExperience :: workExperienceName", workExperienceName)
    // console.log("Work Experience Controllers :: updateWorkExperience :: workExperienceCompany", workExperienceCompany)
    // console.log("Work Experience Controllers :: updateWorkExperience :: workExperienceDescription", workExperienceDescription)
    const updateWorkExperienceDocument = await WorkExperience.findByIdAndUpdate(
        { _id: id },
        {
            workExperienceName, workExperienceCompany, workExperienceDescription
        }
        , {
            new: true
        }
    )
    return res.status(200)
        .json(
            new ApiResponse(200, " Given Work press Experience Update Successfully  ", updateWorkExperienceDocument)
        )
})

const deleteWorkExperience = asyncHandler(async (req, res) => {


    const { id } = req.params;
    console.log("Work Experience Controller :: deleteWorkExperience :: id", id);

    if (!id) {
        throw new ApiError(400, "Work Experience delete id is not present into params ", id)
    }

    const verifyId = await WorkExperience.findById(
        { _id: id }
    )
    console.log("Work Experience Controller :: deleteWorkExperience :: verifyId", verifyId);

    if (verifyId === null) {
        throw new ApiError(400, "Work Experience delete id is not present into db ", id)
    }

    const deleteWorkExperienceDocument = await WorkExperience.findByIdAndDelete(
        { _id: id }
    )
    return res.status(200)
        .json(
            new ApiResponse(200, " Given Work press Experience Delete Successfully  ", deleteWorkExperienceDocument)
        )


})



export { createWorkExperience, fetchWorkExperience, updateWorkExperience, deleteWorkExperience }