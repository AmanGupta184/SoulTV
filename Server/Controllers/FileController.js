import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";

//cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const fileUpload = asyncHandler(async (req, res) => {
  try {
    const uploadImage = req.file ? req.file.path : null;
    if (uploadImage) {
      const result = await cloudinary.uploader.upload(uploadImage);
      res.status(200).json(result.secure_url);
    } else {
      res.status(400).json({ message: "please upload a file.." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default fileUpload;
