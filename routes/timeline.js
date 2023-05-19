import express from "express";
import { updateMyPost, deletepost, getAll, getmyPost  } from "../controllers/timeline.js";
import multer from 'multer';
import { PostModel } from "../models/timeline.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');

// Create the multer storage configuration
console.log("Upload directory:", uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set the destination folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  }
});

const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'dbqrdphkj', 
  api_key: '425779795216949', 
  api_secret: 'GYT6PdCVdxnPM_BJT1IzIsr02BI' 
});

router.post("/new", upload.single('image'), async (req, res) => {
  try {
    const { title, description, year } = req.body;
    const imagePath = req.file.path; // Get the path of the uploaded file

    // Upload the image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(imagePath);

    // Create a new post
    const post = new PostModel({
      image: uploadedImage.secure_url, // Use the secure URL provided by Cloudinary
      title,
      description,
      year
    });

    // Save the post to the database
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create a new post" });
  }
});

router.get("/getAll", getAll);
router.get("/yearDetail/:id", getmyPost);
router.route('/post/:id')
  .put(updateMyPost)
  .delete(deletepost);

export default router;
