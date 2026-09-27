import { Router } from "express";

import { getDashboardStats } from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import { adminOnly } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", protect, adminOnly, getDashboardStats);

export default router;
