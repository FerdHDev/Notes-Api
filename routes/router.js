import express from 'express';
import { validateFields, validateLoginFields, validateNoteFields } from "../utilis/validate.js";
const router = express.Router();

/* Note Routes */
import { createNote } from "../controllers/noteControllers.js";
router.post("/notes/create", validateNoteFields, createNote);

/* User Routes */
import { signUser, loginUser } from "../controllers/userControllers.js";

/* Page Routes */
import { indexPage } from "../controllers/pageControllers.js";

router.get("/", indexPage);
router.post("/sign", validateFields, signUser);
router.post("/signin", validateLoginFields, loginUser);
export default router;
