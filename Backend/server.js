import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4001;
import { connectToDb } from "./db/db.js";
import { router } from "./routes/routes.js";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
        origin:["http://localhost:5173"],
        credentials:true
    }
));
connectToDb();
app.use("/auth",router);
app.listen(port,(req,res) => {
    console.log(`Server listening on port ${port}`);
})