import {User, Role} from "../models/index.js"

class UserService {
  getAllUsersService = async () => {
    try {
      const data = await User.findAll({
        attributes:["name"],
        include:Role
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
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
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

  getBestCustomer = async (req, res) => {
    try {
      const customer = await this.userService.getBestCustomer();
      res.status(200).send({ success: true, message: customer });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

}

export default UserService;
