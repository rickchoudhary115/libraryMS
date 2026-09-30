import { Router } from "express";

import {
  createIssue,
  requestIssue,
  approveRequest,
  rejectRequest,
  returnIssuedBook,
  listIssues,
  listMembers,
} from "../controllers/issue.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", protect, listIssues);

router.get("/members", protect, adminOnly, listMembers);

router.post("/request", protect, requestIssue);

router.post("/", protect, adminOnly, createIssue);

router.get("/requests", protect, adminOnly, listIssues);

router.put("/:id/approve", protect, adminOnly, approveRequest);

router.put("/:id/reject", protect, adminOnly, rejectRequest);

router.put("/:id/return", protect, adminOnly, returnIssuedBook);

export default router;
