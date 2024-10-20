import OrderService from "../services/orderService.js";

class OrderController {
  orderService = new OrderService();

  // Crear una nueva orden
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

  // Obtener todas las órdenes
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

  // Obtener una orden por ID
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

  // Actualizar una orden por ID
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

  // Eliminar una orden por ID
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
}

export default OrderController;