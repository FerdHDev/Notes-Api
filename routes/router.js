import express from 'express';
const router = express.Router();

/* Note Routes */
import { getHome } from "../controllers/noteControllers.js";

/* User Routes */
import { signUser, loginUser } from "../controllers/userControllers.js";

/* Page Routes */
import { indexPage } from "../controllers/pageControllers.js";

router.get("/", indexPage);
router.post("/sign", signUser);
// router.post("/sign", loginUser);
export default router;
