import express from "express";
import { getSettings, updateSetting } from "../controllers/settingsController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to get settings (needed for public page to know if it should show counts)
router.get("/", getSettings);

// Admin only route to update settings
router.put("/", verifyToken, authorizeRole("ADMIN"), updateSetting);

export default router;
