import express from "express";
import {
  getAllSPOCs,
  getUnverifiedSPOCs,
  approveRegistration,
  rejectRegistration,
  verifySPOC,
  createPS,
  getAllPS,
  updatePS,
  deletePS,

  getAllSubmissions,
  updateSPOC,
  deleteSPOC,
} from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require admin
router.use(verifyToken, isAdmin);

// SPOC Management
router.get("/spocs", getAllSPOCs);
router.put("/spoc/:id/verify", verifySPOC);
router.put("/spocs/:id", updateSPOC);
router.delete("/spocs/:id", deleteSPOC);

// Registration Management
router.get("/registrations", getUnverifiedSPOCs);
router.put("/registrations/:id/approve", approveRegistration);
router.delete("/registrations/:id", rejectRegistration);

// Problem Statements
router.post("/ps", createPS);
router.get("/ps", getAllPS);
router.put("/ps/:id", updatePS);
router.delete("/ps/:id", deletePS);

// Submissions overview
router.get("/submissions", getAllSubmissions);

export default router;
