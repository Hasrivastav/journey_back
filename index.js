import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT}`
  );
});












// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const ImageModel = require('./models/Image.js'); // Assuming you created the Image model as mentioned earlier

// const app = express();
// const port = 3000; // Change the port number if needed

// // Configure multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: './uploads', // Set the directory where uploaded files will be stored
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file to avoid naming conflicts
//   }
// });

// const upload = multer({ storage });

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/',  {
//     dbName: "library",
//   },{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });

// // Define a route for image uploads
// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const { filename, path } = req.file;
//     const { description } = req.body;

//     const image = new ImageModel({
//       filename,
//       description,
//       filePath: path
//     });

//     await image.save();

//     res.status(200).json({ message: 'Image uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




