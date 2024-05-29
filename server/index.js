import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Router from './routes/route.js';

const app = express();
mongoose
  .connect(
    "mongodb+srv://kuladeep:kuladeep@cluster0.mssznu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB is now conntected"));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/",Router);
app.listen(5000, () => {
  console.log("server is running in port 5000...");
});
