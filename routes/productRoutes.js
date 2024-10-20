import { Router } from "express";
import ProductController from "../controllers/productController.js";
const productController = new ProductController();

const productRoutes = Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", productController.createProduct); // Ruta para crear un producto
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);
productRoutes.get("/best-selling", productController.getBestSellingProduct); // Ruta para obtener el producto más vendido
productRoutes.get("/least-selling", productController.getLeastSellingProduct); // Ruta para obtener el producto menos vendido

export default productRoutes;