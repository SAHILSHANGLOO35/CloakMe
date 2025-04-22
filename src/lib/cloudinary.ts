import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string): Promise<string> => {
    try {
        // If the base64 string doesn't start with data:image, add it
        const imageData = file.startsWith('data:') ? file : `data:image/jpeg;base64,${file}`;

        const result = await cloudinary.uploader.upload(file, {
            folder: "cloakme",
            resource_type: "auto",
        });

        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        // @ts-ignore
        throw new Error(`Failed to upload image, ${error.message}`);
    }
};
