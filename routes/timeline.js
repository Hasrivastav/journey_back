import express from "express";
import { updateMyPost, deletepost, getAll, getmyPost, updateTask } from "../controllers/timeline.js";
import multer from 'multer';
import { PostModel } from "../models/timeline.js";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');

// Create the multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set the destination folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  }
});



// Create the multer instance
const upload = multer({ storage });

const router = express.Router();

router.post("/new", upload.single('image'), async (req, res) => {
  try {
    const { title, description, year } = req.body;
    const image = req.file.path;

    // Create a new post
    const post = new PostModel({
      image,
      title,
      description,
      year
    });

    // Save the post to the database
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create a new post" });
  }
});

router.get("/getAll", getAll);
router.get("/yearDetail/:id", getmyPost);
router.route('/post/:id')
  .put(updateMyPost)
  .delete(deletepost);

export default router;
