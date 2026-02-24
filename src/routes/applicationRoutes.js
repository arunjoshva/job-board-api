import { applyToJob, getApplicationsForJob, getMyApplications } from "../controllers/applicationController.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply to a job (Protected)
router.post("/:jobId", protect, applyToJob);

// View my applications (Protected)
router.get("/my", protect, getMyApplications);

// View applications for a specific job (Protected - Employer only)
router.get("/job/:jobId", protect, getApplicationsForJob);

export default router;

