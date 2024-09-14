
import { Testimonial } from "../models/testimonial.models.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"
import { uploadOnCloudinary } from "../utilis/Cloudinary.utilis.js";





const createTestimonial = asyncHandler(async (req, res) => {

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


const fetchTestimonial = asyncHandler(async (req, res) => {

    const testimonial = await Testimonial.find().sort({ _id: -1 });  // Sort by _id in descending order

    // console.log("Testominal.controller.js :: fetchTestominal :: testimonial", testimonial)

    res.status(201).
        json(
            new ApiResponse(201, "Testimonial is Created", testimonial)
        )
})


const deleteTestimonial = asyncHandler(async (req, res) => {

    const { _id } = req.params
    // console.log(req.params)

    const delete_testominal = await Testimonial.findOneAndDelete({ _id })
    console.log("Testominal Controllers :: deleteTestominal :: delete_testominal", delete_testominal)
    if (delete_testominal === null) {
        throw new ApiError(404, "testominal is not found ")
    }
    res.status(200).
        json(
            new ApiResponse(201, "Testimonial is Delete Successfully", delete_testominal)
        )
})

const updateTestimonial = asyncHandler(async (req, res) => {



    const { _id } = req.params;
    console.log("Testominal Controllers :: updateTestimonial :: _id", _id)
    console.log("Testominal Controllers :: updateTestimonial :: req.body", req.body)

    const { name, company, feedback } = req.body;


    const result = await Testimonial.findByIdAndUpdate(_id, {
        name, company, feedback
    }, {
        new: true, // Return the updated document
        runValidators: true // Ensure data is validated according to the schema
    });
    if (!result) {
        return res.status(404).send({ message: 'Testimonial not found' });
    }










    const testimonialImgLocalPath = req.file?.path;
    console.log("Testominal.controller.js :: createTestominal :: testimonialImgLocalPath", testimonialImgLocalPath)


    res.status(200)
        .json(
            new ApiResponse(200, "Testimonial is Updates", result)
        )
})
export { createTestimonial, fetchTestimonial, deleteTestimonial, updateTestimonial }