import express from "express";
import {
  getAllPS,
  submitIdea,
  getMySubmissions,
  getMyTeam,
} from "../controllers/teamController.js";
import { verifyToken, isTeamLeader } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // Added this import

const router = express.Router();

// All team leader routes require authentication
router.use(verifyToken, isTeamLeader);

// Team Leader Actions
router.get("/team", getMyTeam);
router.get("/ps", getAllPS);
router.post("/submit", upload.single("ppt_file"), submitIdea); // Modified this line
router.get("/submissions", getMySubmissions);

export default router;
