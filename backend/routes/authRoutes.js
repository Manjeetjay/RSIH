import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", upload.single("identification_doc"), registerUser);

export default router;
