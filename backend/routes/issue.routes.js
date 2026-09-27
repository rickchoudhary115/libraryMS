import { Router } from "express";

import {
  createIssue,
  returnIssuedBook,
  listIssues,
  listMembers,
} from "../controllers/issue.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import { adminOnly } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", protect, listIssues);

router.get("/members", protect, adminOnly, listMembers);

router.post("/", protect, adminOnly, createIssue);

router.put("/:id/return", protect, adminOnly, returnIssuedBook);

export default router;
