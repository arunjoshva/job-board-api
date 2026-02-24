import express from "express";
import { createJob, deleteJob, getAllJobs, getSingleJob, updateJob } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);

// Public Routes
router.post("/", protect, createJob);
router.patch("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

export default router;