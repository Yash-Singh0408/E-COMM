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
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" }, // optional folder for organization
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.status(200).json({
      imageUrl: result.secure_url,
      public_id: result.public_id, // 👈 ADD THIS
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    let { public_id } = req.query; //  from query string

    if (!public_id) {
      return res.status(400).json({ message: "Public ID is required" });
    }

    // 🔧Decode in case it's URL-encoded (e.g. products%2Fabc)
    public_id = decodeURIComponent(public_id);

    console.log(" Deleting image from Cloudinary:", public_id);

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      return res.status(200).json({ message: "Image deleted successfully" });
    } else {
      console.error(" Cloudinary deletion failed:", result);
      return res.status(400).json({ message: "Failed to delete image", result });
    }
  } catch (error) {
    console.error(" Delete error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;