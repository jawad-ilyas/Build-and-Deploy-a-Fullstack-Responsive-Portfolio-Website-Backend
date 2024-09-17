import { asyncHandler } from "../utilis/AsyncHandler.utilis.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.utilis.js";
import { uploadOnCloudinary } from "../utilis/Cloudinary.utilis.js";
import { SingleFileValidate } from "../utilis/SingleFileValidate.utilis.js";
import { Work } from "../models/works.models.js";


// ! create Work
const createWork = asyncHandler(async (req, res) => {

    const { workName, workDescription, workProjectLink, workCodeLink, tags } = req.body;

    console.log(`work controller :: createWork :: workName: ${workName}`);
    console.log(`work controller :: createWork :: workDescription: ${workDescription}`);
    console.log(`work controller :: createWork :: workProjectLink: ${workProjectLink}`);
    console.log(`work controller :: createWork :: workCodeLink: ${workCodeLink}`);
    console.log(`work controller :: createWork :: tags: ${tags}`);

    if (
        [workName, workDescription, workProjectLink].some(field => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are required ")
    }

    const workImgUrl = await SingleFileValidate(req.file?.path, "workImgUrl is required ")
    console.log(`work controller :: createWork :: workImgUrl: ${workImgUrl}`);


    const newWork = await Work.create(
        {
            workName, workDescription, workProjectLink, workCodeLink, tags, workImgUrl
        }
    )



    return res.status(201).
        json(new ApiResponse(201, "New Work is created Succesfully ", newWork))

})

// ! fetch Work
const fetchWork = asyncHandler(async (req, res) => {

    const works = await Work.find();
    res.status(200).json(
        new ApiResponse(200, "All Works Are Fetech", works)
    )

})

// ! update Work
const updateWork = asyncHandler(async (req, res) => {
    const { workName, workDescription, workProjectLink, workCodeLink, tags } = req.body;

    console.log(`work controller :: updateWork :: workName: ${workName}`);
    console.log(`work controller :: updateWork :: workDescription: ${workDescription}`);
    console.log(`work controller :: updateWork :: workProjectLink: ${workProjectLink}`);
    console.log(`work controller :: updateWork :: workCodeLink: ${workCodeLink}`);
    console.log(`work controller :: updateWork :: tags: ${tags}`);

    const { id } = req.params;
    console.log(`work controller :: updateWork :: id: ${id}`);

    if (!id) {
        throw new ApiError(404, "ID is found into params udpate work case ")
    }

    const verifyId = await Work.findById({ _id: id })
    console.log(`work controller :: updateWork :: verifyId: ${verifyId}`);

    if (verifyId === null) {
        throw new ApiError(404, "ID is match into db for  update work case ")
    }
    let updateWork;
    if (req.file !== undefined) {
        const workImgUrl = await SingleFileValidate(req.file?.path, "workImgUrl is required  for update acase")
        updateWork = await Work.findByIdAndUpdate(
            {
                _id: id
            }
            , {
                workName, workDescription, workProjectLink, workCodeLink, tags, workImgUrl
            },
            {
                new: true,
                runValidators: false
            }
        )
        // console.log(`work controller :: updateWork :: workImgUrl: ${workImgUrl}`);

    }
    else {
        console.log("else case where update image is not present ")
        updateWork = await Work.findByIdAndUpdate(
            {
                _id: id
            }
            , {
                workName, workDescription, workProjectLink, workCodeLink, tags, workImgUrl
            },
            {
                new: true,
                runValidators: false
            }
        )
    }


    res.status(200)
        .json(
            new ApiResponse(200, "Work is update successfully ", updateWork)
        )



})

// ! delete Work
const deleteWork = asyncHandler(async (req, res) => {


    const { id } = req.params;
    console.log(`work controller :: deleteWork :: id: ${id}`);

    if (!id) {
        throw new ApiError(404, "ID is found into params delete work case ")
    }

    const verifyId = await Work.findById({ _id: id })
    console.log(`work controller :: deleteWork :: verifyId: ${verifyId}`);

    if (verifyId === null) {
        throw new ApiError(404, "ID is match into db for  delete work case ")
    }

    const deleteWorkDocument = await Work.findByIdAndDelete(
        { _id: id }
    )

    res.status(200)
        .json(
            new ApiResponse(200, "Delete Work Document Successfully ", deleteWorkDocument)
        )
})


export { createWork, fetchWork, updateWork, deleteWork }
