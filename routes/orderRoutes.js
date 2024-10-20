import { Router } from "express";
import OrderController from "../controllers/orderController.js";

const orderController = new OrderController();

const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", orderController.createOrder);
orderRoutes.put("/:id", orderController.updateOrder);
orderRoutes.delete("/:id", orderController.deleteOrder);

// Rutas para cambiar el estado de la orden
orderRoutes.put("/:id/confirm", orderController.confirmOrder);
orderRoutes.put("/:id/prepare", orderController.prepareOrder);
orderRoutes.put("/:id/send", orderController.sendOrder);

export default orderRoutes;