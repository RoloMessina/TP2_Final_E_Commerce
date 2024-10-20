import { Router } from "express";
import CartController from "../controllers/cartController.js";

const cartControllerInstance = new CartController();

const cartRoutes = Router();

cartRoutes.post("/", cartControllerInstance.createCart);
cartRoutes.get("/:userId", cartControllerInstance.getCartByUserId);
cartRoutes.post("/add", cartControllerInstance.addProductToCart);
cartRoutes.post("/remove", cartControllerInstance.removeProductFromCart);

export default cartRoutes;