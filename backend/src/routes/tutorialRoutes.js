import express from "express";
import { getAllTutorials, getTutorialById, createTutorial, updateTutorial, deleteTutorial } from "../controllers/tutorialController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes (anyone can view tutorials? - Requirement says "sebelum dapat mengakses konten tersebut pengguna diwajibkan register dan melakukan login")
// So actually ALL routes should be protected?
// "Aplikasi menyediakan konten – konten yang bermanfaat... Namun sebelum dapat mengakses konten tersebut pengguna diwajibkan register dan melakukan login"
// This implies the content is protected.
// I will protect ALL routes for now, or maybe leave the list public but detail protected?
// "sebelum dapat mengakses konten tersebut" might mean the detail/content.
// But mostly commonly, list might be public or protected.
// Given strict requirement, I'll protect everything to be safe.
// Wait, "halaman utama" usually implies a landing page.
// I will protect all product/tutorial routes to be safe.

router.get("/", protect, getAllTutorials);
router.get("/:id", protect, getTutorialById);

// Admin/Creator logic? For now, let's allow any authenticated user to create? 
// Or maybe just read-only for users?
// "para anggotanya belajar custom keahlian... Aplikasi menyediakan konten"
// Usually implies admins provide content.
// But for this task, I'll assume standard CRUD.
// I'll keep create/update/delete protected.

router.post("/", protect, createTutorial);
router.put("/:id", protect, updateTutorial);
router.delete("/:id", protect, deleteTutorial);

export default router;
