import express from "express";
import { create,deletepost,getAll,getmyPost,updateTask } from "../controllers/timeline.js";
import multer from 'multer';

const router = express.Router();


const storage = multer.diskStorage({
    destination: './uploads', // Set the directory where uploaded files will be stored
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file to avoid naming conflicts
    }
  });

  const upload = multer({ storage });


router.post("/new",  upload.single('image'), create);
router.get("/getAll", getAll);
router.get("/yearDetail/:id",getmyPost)
router.route('/post/:id')
  .put(updateTask)
  .delete(deletepost);





export default router;