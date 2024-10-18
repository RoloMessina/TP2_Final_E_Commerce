import RoleService from "../services/RoleService.js";

class RoleController {
  roleService = new RoleService();

  // Get all roles
  getAllRoles = async (req, res) => {
    try {
      const roles = await this.roleService.getAllRolesService();
      res.status(200).send({ success: true, message: roles });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Get a role by ID
  getRoleById = async (req, res) => {
    try {
      const role = await this.roleService.getRoleByIdService(req.params.id);
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Create a new role
  createRole = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send({
          success: false,
          message: "Role name is required",
        });
      }
      const role = await this.roleService.createRoleService({ name });
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Update a role by ID
  updateRole = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send({
          success: false,
          message: "Role name is required",
        });
      }
      const role = await this.roleService.updateRoleService(req.params.id, { name });
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Delete a role by ID
  deleteRole = async (req, res) => {
    try {
      const role = await this.roleService.deleteRoleService(req.params.id);
      res.status(200).send({ success: true, message: role });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default RoleController;