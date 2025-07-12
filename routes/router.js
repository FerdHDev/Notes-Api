import express from 'express';
const router = express.Router();

/* Note Routes */
import { createNote } from "../controllers/noteControllers.js";
router.post("/notes/create", createNote);

/* User Routes */
import { signUser, loginUser } from "../controllers/userControllers.js";

/* Page Routes */
import { indexPage } from "../controllers/pageControllers.js";

router.get("/", indexPage);
router.post("/sign", signUser);
router.post("/signin", loginUser);
export default router;
