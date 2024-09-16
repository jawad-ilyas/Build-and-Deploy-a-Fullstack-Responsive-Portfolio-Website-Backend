import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"
import { ApiError } from "../utilis/ApiError.utilis.js"
import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { uploadOnCloudinary } from "../utilis/Cloudinary.utilis.js"
import { Skill } from "../models/skill.models.js"

const createSkill = asyncHandler(async (req, res) => {


    const { skillName, skillBgColor } = req.body;
    console.log("skill controller :: createSkill :: skillName", skillName)
    if (!skillName) {
        throw new ApiError(404, "Skill Name is required filed")
    }

    const verifySkill = await Skill.findOne({ skillName })
    console.log("skill controller :: createSkill :: verifySkill", verifySkill)

    if (verifySkill !== null) {
        throw new ApiError(404, "Skill Name is  already present into the db")
    }

    const skillImgLocalPath = req.file?.path;
    console.log("skill controller :: createSkill :: skillImgLocalPath", skillImgLocalPath)

    if (!skillImgLocalPath) {
        throw new ApiError(404, "SKill Image is required Field")
    }

    const skillImg = await uploadOnCloudinary(skillImgLocalPath);


    const skill = await Skill.create(
        {
            skillName,
            skillBgColor: skillBgColor || "",
            skillImg: skillImg?.url
        }
    )


    res.status(201)
        .json(
            new ApiResponse(200, "New Skill is created ", skill)
        )

})

const fetchSkill = asyncHandler(async (req, res) => {

    const skills = await Skill.find();

    res.status(200)
        .json(
            new ApiResponse(200, "Skills List", skills)
        )
})

const updateSkill = asyncHandler(async (req, res) => {


    const { id } = req.params;
    console.log("Skill Controllers ::  updateSkill :: id", id)

    const { skillName, skillBgColor } = req.body;
    console.log("skill controller :: createSkill :: skillName", skillName)
    console.log("skill controller :: createSkill :: skillBgColor", skillBgColor)
    
    if (!id) {
        throw new ApiError(404, "Skill id is not present ")
    }


    const verifySkill = await Skill.findById({ _id: id })
    console.log("Skill Controllers ::  updateSkill :: verifySkill", verifySkill)

    if (verifySkill === null) {
        throw new ApiError(404, "Skill id is not matched  ")
    }



    const skillImgLocalPath = req.file?.path;


    let updateSkillDocument;
    if (skillImgLocalPath === undefined) {
        updateSkillDocument = await Skill.findByIdAndUpdate(
            { _id: id },
            { skillName, skillBgColor },
            {
                new: true
            }
        )
    }
    else {
        const skillImg = await uploadOnCloudinary(skillImgLocalPath);
        updateSkillDocument = await Skill.findByIdAndUpdate(
            { _id: id },
            { skillName, skillBgColor, skillImg: skillImg?.url },
            {
                new: true
            }
        )
    }


    res.status(200)
        .json(
            new ApiResponse(200, "Skill is update successfully ", updateSkillDocument)
        )





})

const deleteSkill = asyncHandler(async (req, res) => {


    const { id } = req.params;
    console.log("Skill Controllers ::  deleteSkill :: id", id)

    if (!id) {
        throw new ApiError(404, "Skill id is not present ")
    }


    const verifySkill = await Skill.findById({ _id: id })
    console.log("Skill Controllers ::  deleteSkill :: verifySkill", verifySkill)

    if (verifySkill === null) {
        throw new ApiError(404, "Skill id is not matched  ")
    }


    const deleteSkillDocument = await Skill.findByIdAndDelete(
        { _id: id },

    )
    console.log("Skill Controllers ::  deleteSkill :: deleteSkillDocument", deleteSkillDocument)

    res.status(200)
        .json(
            new ApiResponse(200, "Skill is delete successfully ", deleteSkillDocument)
        )

})

export { createSkill, fetchSkill, updateSkill, deleteSkill }