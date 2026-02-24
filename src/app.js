import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); //Mounting the router(mini express application) in app(main express application)
app.use("/api/jobs", jobRoutes); //Mountin Job Routes in app.js
app.use("/api/applications", applicationRoutes); //Mounting Application Routes in app.js

app.get("/", (req,res) => {
    res.json(
        {message:"Job Board API Running"}
    );
});

export default app;