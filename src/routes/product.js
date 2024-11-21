import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/getAllProducts", productController.getAllProducts);
router.get("/:productId", productController.getProduct);
router.post("/addProduct", productController.addproduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export default router;
