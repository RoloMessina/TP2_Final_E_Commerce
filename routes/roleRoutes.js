import { Router } from "express";
import RoleController from "../controllers/roleController.js";

const roleController = new RoleController();

const roleRoutes = Router();

roleRoutes.get("/", roleController.getAllRoles);
roleRoutes.get("/:id", roleController.getRoleById);
roleRoutes.post("/", roleController.createRole);
roleRoutes.put("/:id", roleController.updateRole);
roleRoutes.delete("/:id", roleController.deleteRole);

export default roleRoutes;