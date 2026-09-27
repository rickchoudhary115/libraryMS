import { Router } from "express";

import { register, login, getMe } from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);

export default router;
