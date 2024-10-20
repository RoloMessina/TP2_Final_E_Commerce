import { Router } from "express";
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js"; // Importar las rutas de roles
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js"; // Importar las rutas de productos
import { logger } from "../midlewares/logger.js"; // Asegúrate de que esta ruta sea correcta
 
const routes = Router();

routes.use(logger); // Aplicar el middleware a todas las rutas

routes.use("/users", userRoutes);  // Agregar la ruta de usuarios
routes.use("/roles", roleRoutes); // Agregar la ruta de roles
routes.use("/orders", orderRoutes); // Agregar la ruta de ordenes
routes.use("/products", productRoutes); // Usar las rutas de productos

export default routes;