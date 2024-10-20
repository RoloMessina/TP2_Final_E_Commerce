import { Router } from "express";
import RoleController from "../controllers/roleController.js";

const roleControllerInstance = new RoleController();

const roleRoutes = Router();

roleRoutes.get("/", roleControllerInstance.getAllRoles);
roleRoutes.get("/:id", roleControllerInstance.getRoleById);
roleRoutes.post("/", roleControllerInstance.createRole);
roleRoutes.put("/:id", roleControllerInstance.updateRole);
roleRoutes.delete("/:id", roleControllerInstance.deleteRole);

export default roleRoutes;