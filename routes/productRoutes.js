import { Router } from "express";
import ProductController from "../controllers/productController.js";
const productControllerInstance = new ProductController();

const productRoutes = Router();

productRoutes.get("/", productControllerInstance.getAllProducts);
productRoutes.get("/:id", productControllerInstance.getProductById);
productRoutes.post("/", productControllerInstance.createProduct); // Ruta para crear un producto
productRoutes.put("/:id", productControllerInstance.updateProduct);
productRoutes.delete("/:id", productControllerInstance.deleteProduct);

export default productRoutes;