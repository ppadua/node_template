/* Vendors */
import { Router } from "express";

/* Controllers */
import productController from "../controllers/product.controller.js";
import cartController from "../controllers/cart.controller.js";

const router = Router();

/* Products */
router.get("/", productController.index);
router.post("/products/add-to-cart", productController.addProductToCart);

/* Carts */
router.post("/carts/update", cartController.updateCartData);
router.post("/carts/checkout", cartController.checkout);

export default router;