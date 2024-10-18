import { Role } from "../models/index.js";

class RoleService {
  // Get all roles
  async getAllRolesService() {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      throw error;
    }
  }

  // Get a role by ID
  async getRoleByIdService(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      return role;
    } catch (error) {
      throw error;
    }
  }

  // Create a new role
  async createRoleService(roleData) {
    try {
      const role = await Role.create(roleData);
      return role;
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  }

  // Update a role by ID
  async updateRoleService(id, roleData) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      await role.update(roleData);
      return role;
    } catch (error) {
      throw error;
    }
  }

  // Delete a role by ID
  async deleteRoleService(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      await role.destroy();
      return role;
    } catch (error) {
      throw error;
    }
  }
}

export default RoleService;