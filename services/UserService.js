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
  getUserByIdService = (id) => {
    return "get user by id service";
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
  updateUserService = (id) => {
    return "update user service";
  };
  deleteUserService = (id) => {
    return "delete user service";
  };
}

export default UserService;
