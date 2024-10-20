import OrderService from "../services/orderService.js";
import UserService from "../services/userService.js";

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

  // Buscar mejor cliente
  getBestCustomer = async (req, res)=> {
    try {
      const bestCustomer = await OrderService.findBestCustomer();
      res.status(200).json(bestCustomer);
    } catch (error) {
      res.status(500).json({ error: `Error finding best customer: ${error.message}` });
    }
  }


}

export default OrderController;