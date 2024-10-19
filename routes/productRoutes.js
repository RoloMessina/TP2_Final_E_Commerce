import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productController = new ProductController();

const productRoutes = Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", productController.createProduct); // Ruta para crear un producto
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);

export default productRoutes;