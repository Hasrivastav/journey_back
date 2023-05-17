import express from "express";
import timlineRouter from "./routes/timeline.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; 


export const app = express();

const rootPath = path.resolve(); // Get the root path of your project

app.use('/uploads', express.static(path.join(rootPath, 'uploads')));

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



// app.use('/uploads', express.static(''));
app.use("/api/v1/timeline", timlineRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});

