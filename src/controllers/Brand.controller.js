import { Brand } from "../models/brand.models.js";
import { asyncHandler } from "../utilis/AsyncHandler.utilis.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.utilis.js";
import { uploadOnCloudinary } from "../utilis/Cloudinary.utilis.js";



// ! create Brand
const createBrand = asyncHandler(async (req, res) => {

    const { brandName } = req.body;
    console.log("Brand Controller :: createBrand  :: brandName ", brandName)


    if (!brandName) {
        throw new ApiError(404, "Brand Name is not found And it is required Filed")
    }

    const brandImgUrlLocalPath = req.file?.path;
    console.log("Brand Controller :: createBrand  :: brandImgUrlLocalPath ", brandImgUrlLocalPath)

    if (!brandImgUrlLocalPath) {
        throw new ApiError(404, "Brand Image  is not found And it is required Filed")
    }


    const brandImgUrl = await uploadOnCloudinary(brandImgUrlLocalPath)



    const brand = await Brand.create(
        {
            brandName,
            brandImgUrl: brandImgUrl?.url
        }
    )
    console.log("Brand Controller :: createBrand  :: brand ", brand)



    res.status(201)
        .json(
            new ApiResponse(201, "New Brand Document is created ", brand)
        )
})

// ! fetch  Brand
const fetchBrand = asyncHandler(async (req, res) => {

    const brands = await Brand.find();

    res.status(200)
        .json(
            new ApiResponse(200, "ALL BRANDS ARE FETCHED ", brands)
        )

})

// ! update  Brand
const updateBrand = asyncHandler(async (req, res) => {


    const { id } = req.params;
    console.log("Brand Controller :: updateBrand :: id ", id)

    if (!id) {
        throw new ApiError(404, "id is not found update brand ")
    }

    const verifyBrand = await Brand.findById(id);
    console.log("about controllers :: updateAbout :: verifyAbout", verifyBrand)

    if (!verifyBrand) {
        throw new ApiError(404, "Brand Document is not found For Updata :: update Brand")
    }



    const brandImgUrlLocalPath = req.file?.path;
    console.log("Brand Controller :: createBrand  :: brandImgUrlLocalPath ", brandImgUrlLocalPath)

    const { brandName } = req.body;

    let brandImgUrl;
    if (brandImgUrlLocalPath) {

        brandImgUrl = await uploadOnCloudinary(brandImgUrlLocalPath)
    }


    let updateBrandDocument;
    if (brandImgUrlLocalPath === undefined) {

        updateBrandDocument = await Brand.findByIdAndUpdate(
            { _id: id },
            { brandName },
            {
                new: true,
                runValidators: true // Ensure data is validated according to the schema

            }
        )
    }
    else {
        updateBrandDocument = await Brand.findByIdAndUpdate(
            { _id: id },
            {
                brandName,
                brandImgUrl: brandImgUrl?.url
            },
            {
                new: true,
                runValidators: true // Ensure data is validated according to the schema

            }
        )
    }


    return res.status(200)
        .json(
            new ApiResponse(200, "Brand is update Successfully", updateBrandDocument)
        )
})

// ! delete  Brand
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("Brand Controller :: deleteBrand :: id ", id)

    if (!id) {
        throw new ApiError(404, "id is not found delete brand ")
    }

    const verifyBrand = await Brand.findById(id);
    console.log("about controllers :: deleteBrand :: verifyAbout", verifyBrand)

    if (!verifyBrand) {
        throw new ApiError(404, "Brand Document is not found For Updata :: update Brand")
    }


    const deleteBrandDocument = await Brand.findByIdAndDelete(
        { _id: id },
    )

    console.log("about controllers :: deleteBrand :: deleteBrandDocument", deleteBrandDocument)

    res.status(200)
        .json(
            new ApiResponse(200, "Brand Document is delete ", deleteBrandDocument)
        )

})





export { createBrand, deleteBrand, updateBrand, fetchBrand }