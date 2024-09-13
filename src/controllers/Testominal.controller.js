
import { Testimonial } from "../models/testimonial.models.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"
import { uploadOnCloudinary } from "../utilis/cloudinary.utilis.js";




const createTestominal = asyncHandler(async (req, res) => {

    console.log(req.body?.name)

    const { name, company, feedback } = req.body;
    console.log("Testimonial Controller :: createTestominal :: name ", name)
    console.log("Testimonial Controller :: createTestominal :: company ", company)
    console.log("Testimonial Controller :: createTestominal :: feedback ", feedback)

    if (
        [name, company, feedback].filter(field => !field || field.trim() === "").length > 0
    ) {
        throw new ApiError(404, "All Fields are required");
    }



    const testimonialImgLocalPath = req.file?.path;
    console.log("Testominal.controller.js :: createTestominal :: testimonialImgLocalPath", testimonialImgLocalPath)


    if (!testimonialImgLocalPath) {
        throw new ApiError(404, "Testominal.controller.js :: createTestominal :: testimonialImgLocalPath are required");
    }

    const testimonialImg = await uploadOnCloudinary(testimonialImgLocalPath)


    const testominal = await Testimonial.create(
        {
            name,
            company,
            feedback,
            testimonialImg: testimonialImg?.url

        }
    )
    console.log("Testominal.controller.js :: createTestominal :: testominal", testominal)




    res.status(201).
        json(
            new ApiResponse(201, "Testimonial is Created", testominal)
        )
})


const fetchTestominal = asyncHandler(async (req, res) => {

    const testimonial = await Testimonial.find();

    console.log("Testominal.controller.js :: fetchTestominal :: testimonial", testimonial)

    // res.status(201).
    //     json(
    //         new ApiResponse(201, "Testimonial is Created", testimonial)
    //     )
})

export { createTestominal, fetchTestominal }