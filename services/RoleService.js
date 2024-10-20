import { User, Role, Cart } from "../models/index.js";

class UserService {
  getAllUsersService = async () => {
    try {
      const data = await User.findAll({
        attributes: ["name"],
        include: Role,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  getUserByIdService = async (id) => {
    try {
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'mail', 'dni', 'dateOfBirth', 'address', 'city', 'state', 'RoleId']
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };

  async createUserService(userData) {
    const transaction = await connection.transaction();
    try {
      const user = await User.create(userData, { transaction });
      await Cart.create({
        UserId: user.id,
        delivery_address: userData.address,
        email: userData.mail,
      }, { transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating user:", error);
      throw error;
    }
  };

  async updateUserService(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.update(userData);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUserService(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default UserService;