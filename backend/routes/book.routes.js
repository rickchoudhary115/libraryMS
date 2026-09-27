import { Router } from "express";

import {
  listBooks,
  addBook,
  editBook,
  removeBook,
} from "../controllers/book.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import { adminOnly } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", protect, listBooks);

router.post("/", protect, adminOnly, addBook);

router.put("/:id", protect, adminOnly, editBook);

router.delete("/:id", protect, adminOnly, removeBook);

export default router;
