import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "jawadmughaldev",
    api_key: process.env.CLOUDINARY_API_KEY || "273434779457487",
    api_secret: process.env.CLOUDINARY_API_SECRET || "Gu3a2tA5-1SiWA9IGP40NNprMWU"
});


const uploadOnCloudinary = async (localFilePath) => {



    if (!localFilePath) return null;
    try {
        const response = await cloudinary.uploader
            .upload(
                localFilePath, {
                resource_type: 'auto'
            }
            )
        fs.unlinkSync(localFilePath)
        // console.log(" cloudinary utilis js  :: uploadOnCloudinary :: response variable :: reponse ", response)

        return response;
    } catch (error) {
         fs.unlinkSync(localFilePath)
        console.error("Cloudinary upload error:", error);
        return null;
    }
}


export { uploadOnCloudinary }