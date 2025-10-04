import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 8080;

app.use("/users", userRouter);
app.use("/pin", pinRouter);
app.use("/comment", commentRouter);
app.use("/board", boardRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running port: ${PORT}`);
});
