import OrderService from "../services/OrderService.js";
import UserService from "../services/UserService.js";

class OrderController {
  orderService = new OrderService();
  userService = new UserService();

  // Create a new order
  createOrder = async (req, res) => {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Get all orders
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

  // Get an order by ID
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

  // Update an order by ID
  updateOrder = async (req, res) => {
    try {
      const order = await this.orderService.updateOrder(req.params.id, req.body);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Delete an order by ID
  deleteOrder = async (req, res) => {
    try {
      const order = await this.orderService.deleteOrder(req.params.id);
      res.status(200).send({ success: true, message: order });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Buscar mejores clientes
  buscarMejoresClientes = async (req, res) => {
    try {
      const mejoresClientes = await this.orderService.buscarMejoresClientes();
      res.status(200).send({ success: true, message: mejoresClientes });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default OrderController;