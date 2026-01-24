import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";  

const router = express.Router();

// Public routes (anyone can view products)
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (must be logged in)
router.post("/", protect, createProduct);        
router.put("/:id", protect, updateProduct);      
router.delete("/:id", protect, deleteProduct);   

export default router;
