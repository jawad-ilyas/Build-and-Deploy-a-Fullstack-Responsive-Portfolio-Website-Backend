import { ApiResponse } from "../utilis/ApiResponse.utilis.js"
import { asyncHandler } from "../utilis/AsyncHandler.utilis.js"




const createTestominal = asyncHandler((req, res) => {

    console.log(req.body)

    res.status(201).
        json(
            new ApiResponse(201, "Testimonial is Created", req.body)
        )
})

export { createTestominal }