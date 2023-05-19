const express = require("express");
const { updateMyPost, deletepost, getAll, getmyPost, updateTask } = require("../controllers/timeline.js");
const multer = require('multer');
const { PostModel } = require("../models/timeline.js");
const path = require("path");
const router = express.Router();

const uploadDir = path.join(__dirname, 'uploads');

// Create the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  }
});

// Create the multer upload instance
const upload = multer({ storage });

router.post("/upload", upload.single('image'), async (req, res) => {
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

module.exports = router;
