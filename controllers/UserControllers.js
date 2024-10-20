import UserService from "../services/userService.js";

class UserControllers {
  userService = new UserService();

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsersService();
      res.status(200).send({ success: true, message: users });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({
        success: false,
        message: error.message,
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, lastname, dni, mail, pass, dateOfBirth, RoleId, address, city, state } = req.body;
      const user = await this.userService.createUserService({ name, lastname, dni, mail, pass, dateOfBirth, RoleId, address, city, state });
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user = await this.userService.updateUserService(req.params.id, req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user = await this.userService.deleteUserService(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default UserControllers;
