import express from 'express';
import { validateFields, validateLoginFields, validateNoteFields } from "../utilis/validate.js";
const router = express.Router();

/* Note Routes */
import { createNote } from "../controllers/noteControllers.js";
router.post("/notes/create", validateNoteFields, createNote);

/* User Routes */
import { signUser, loginUser } from "../controllers/userControllers.js";
router.post("/sign", validateFields, signUser);
router.post("/signin", validateLoginFields, loginUser);

/* Page Routes */
import { indexPage, loginPage } from "../controllers/pageControllers.js";

/* Dashboard Rputes */
import { dashPage, dashNotes } from "../controllers/dashControllers.js";

router.get("/", indexPage);
router.get("/login", loginPage);
router.get("/dashboard", dashPage);
router.get("/dashboard/notes", dashNotes);
export default router;
