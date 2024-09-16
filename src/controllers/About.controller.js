
import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"
import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { ApiError } from "../utilis/ApiError.utilis.js";
import { About } from "../models/about.models.js";
import { uploadOnCloudinary } from "../utilis/Cloudinary.utilis.js";
// ! create about 
const createAbout = asyncHandler(async (req, res) => {

    const { aboutName, aboutDescription } = req.body;
    // console.log(req.body)
    // console.log(req.file)

    if (
        [aboutName, aboutDescription].some(fileds => !fileds || fileds.trim() === "")
    ) {
        throw new ApiError(404, "All Fields Are required ")
    }

    const verifyUser = await About.findOne({ aboutName })
    // console.log("about controllers :: verify user :: ", verifyUser)
    if (verifyUser !== null) {
        throw new ApiError(400, "About is already Present  ")
    }


    const aboutImgUrlLocalUrl = await uploadOnCloudinary(req.file?.path)

    console.log("About Controllers :: create About :: aboutImgUrlLocalUrl", aboutImgUrlLocalUrl)

    if (!aboutImgUrlLocalUrl) {
        throw new ApiError(404, "About Image   Are required ")
    }


    const about = await About.create({
        aboutName,
        aboutDescription,
        aboutImgUrl: aboutImgUrlLocalUrl?.url,
    })

    console.log("About Controllers :: create About :: about", about)


    res.status(201)
        .json(
            new ApiResponse(200, "New About is Created ", about)
        )
})


// ! delete about 
const deleteAbout = asyncHandler(async (req, res) => {

    const { _id } = req.params
    console.log("about controller :: deleteAbout :: _id ", _id)


    const verifyAbout = await About.findById(_id)
    console.log("about controller :: deleteAbout :: verifyAbout ", verifyAbout)

    if (verifyAbout == null) {
        throw new ApiError(404, "About is not found ")
    }

    const deleteReturn = await About.findByIdAndDelete(_id)

    if (deleteReturn === null) {
        throw new ApiError(500, "About is not proplery delete try again ")
    }
    console.log("about controller :: deleteAbout :: deleteReturn ", deleteReturn)


    return res.status(200)
        .json(
            new ApiResponse(200, "About is delete ", deleteReturn)
        )

})


// !  fetch about 
const fetchAbout = asyncHandler(async (req, res) => {

    const abouts = await About.find();

    console.log("about controllers :: fetchABout :: abouts ", abouts)

    res.status(200)
        .json(
            new ApiResponse(200, "Abouts are fetched ", abouts)
        )
})


// ! update about 
const updateAbout = asyncHandler(async (req, res) => {

    const { id } = req.params;

    console.log("about controllers :: updateAbout :: id", id)

    const verifyAbout = await About.findById(id);
    console.log("about controllers :: updateAbout :: verifyAbout", verifyAbout)

    if (!verifyAbout ) {
        throw new ApiError(404, "About Document is not found For Updata :: update About")
    }


    let aboutImgUrlLocalPath

    if (req.file?.path !== undefined) {
        aboutImgUrlLocalPath = await uploadOnCloudinary(req.file?.path)
        console.log("about controllers :: updateAbout :: aboutImgUrlLocalPath", aboutImgUrlLocalPath)
    }
    const { aboutName, aboutDescription } = req.body;
    console.log("about controllers :: updateAbout :: aboutName", aboutName)
    console.log("about controllers :: updateAbout :: aboutDescription", aboutDescription)
    let updateAboutDocument;
    if (aboutImgUrlLocalPath === undefined) {
        console.log("if case for the about section ")
        updateAboutDocument = await About.findOneAndUpdate({ _id: id },
            {
                aboutName,
                aboutDescription,

            },
            {
                new: true, // Return the updated document
                runValidators: true // Ensure data is validated according to the schema
            }
        )
    }
    else {
        console.log("else  case for the about section ")
        updateAboutDocument = await About.findOneAndUpdate({ _id: id },
            {
                aboutName,
                aboutDescription,
                aboutImgUrl: aboutImgUrlLocalPath?.url
            },
            {
                new: true, // Return the updated document
                runValidators: true // Ensure data is validated according to the schema
            }
        )
    }

    console.log("about controllers :: updateAbout :: updateAboutDocument", updateAboutDocument)



})

export { createAbout, deleteAbout, fetchAbout, updateAbout }