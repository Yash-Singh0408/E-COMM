import multer from "multer";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

const router = express.Router();

// Cloudinary configuration
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        
        if(!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to upload to cloudinary
        const streamUpload = (fileBuffer)=>{
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result)=>{
                    if(result) {
                        resolve(result);
                    }else{
                        reject(error);
                    }
                });
                // Use streamifier to convert buffer to stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
        }

        // call the function
        const result = await streamUpload(req.file.buffer);
        // Return the secure URL
        res.status(200).json({ imageUrl: result.secure_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})


export default router;