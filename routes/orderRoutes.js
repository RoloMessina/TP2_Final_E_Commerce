import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const orderController = new OrderController();

const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", orderController.createOrder);
orderRoutes.put("/:id", orderController.updateOrder);
orderRoutes.delete("/:id", orderController.deleteOrder);
orderRoutes.get("/mejores-clientes", orderController.buscarMejoresClientes); // Ruta para buscar mejores clientes

export default orderRoutes;