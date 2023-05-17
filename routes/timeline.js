import express from "express";
import { deletepost,getAll,getmyPost,updateTask } from "../controllers/timeline.js";
import multer from 'multer';
import { PostModel } from "../models/timeline.js";
const router = express.Router();


const storage = multer.diskStorage({
    destination: './uploads', // Set the directory where uploaded files will be stored
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file to avoid naming conflicts
    }
  });

  const upload = multer({ storage });


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
router.get("/yearDetail/:id",getmyPost)
router.route('/post/:id')
  .put(updateTask)
  .delete(deletepost);





export default router;