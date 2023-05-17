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



app.use('/uploads', express.static(''));
app.use("/api/v1/timeline", timlineRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});

