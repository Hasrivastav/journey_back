import express from "express";
import timlineRouter from "./routes/timeline.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// const storage = multer.diskStorage({
//     destination: './uploads', // Set the directory where uploaded files will be stored
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file to avoid naming conflicts
//     }
//   });

// export const upload = multer({ storage });

app.use("/api/v1/timeline", timlineRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});

