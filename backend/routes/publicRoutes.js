import express from "express";
import { getPublicPS } from "../controllers/publicController.js";

const router = express.Router();

router.get("/ps", getPublicPS);

export default router;
