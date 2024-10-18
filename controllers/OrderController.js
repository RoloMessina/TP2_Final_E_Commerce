import OrderService from "../services/OrderService.js";
import UserService from "../services/UserService.js";

class OrderController {
  orderService = new OrderService();
  userService = new UserService();

  // funcion que verifica si el usuario es un administrador
  isAdmin = (user) => {
    return user.RoleId === 1;
  };

  // crear nueva orden
  createOrder = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.user.id);
      if (!this.isAdmin(user)) {
        return res.status(403).send({ success: false, message: "You do not have permission to create orders" });
      }
      const order = await this.orderService.createOrder(req.body, user);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // obtener todas las oredenes
  getAllOrders = async (req, res) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).send({ success: true, message: orders });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // obtener orden por ID
  getOrderById = async (req, res) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // actualizar orden por ID
  updateOrder = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.user.id);
      if (!this.isAdmin(user)) {
        return res.status(403).send({ success: false, message: "You do not have permission to update orders" });
      }
      const order = await this.orderService.updateOrder(req.params.id, req.body, user);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Eliminar Orden Por ID
  deleteOrder = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.user.id);
      if (!this.isAdmin(user)) {
        return res.status(403).send({ success: false, message: "You do not have permission to delete orders" });
      }
      const order = await this.orderService.deleteOrder(req.params.id, user);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default OrderController;