import { upload } from "../middlerwares/multer.middleware.js"
import { ApiError } from "./ApiError.utilis.js"
import { uploadOnCloudinary } from "./Cloudinary.utilis.js"
const SingleFileValidate = async (file, message) => {

    // console.log("SingleFileValidate.js :: SingleFileValidate :: file?.path", file)
    if (!file) {
        throw new ApiError(400, message)
    }

    const fileUrl = await uploadOnCloudinary(file)

    if (!fileUrl) {
        throw new ApiError(400, "issue on the upload on cloudinary " + message)
    }
    return fileUrl?.url
}

export { SingleFileValidate }