import { Router } from "express";
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js"; // Importar las rutas de roles
import { logger } from "../midlewares/logger.js"; // Asegúrate de que esta ruta sea correcta

const routes = Router();

routes.use(logger); // Aplicar el middleware a todas las rutas

routes.use("/user", userRoutes);
routes.use("/roles", roleRoutes); // Usar las rutas de roles
// routes.use("/product", productRoutes);

export default routes;