import { Order, User } from "../models/index.js";
import { Sequelize } from "sequelize";

class OrderService {
  // Create a new order
  async createOrder(orderData) {
    try {
      const order = await Order.create(orderData);
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Get all orders
  async getAllOrders() {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  // Get an order by ID
  async getOrderById(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }

  // Update an order by ID
  async updateOrder(id, orderData) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.update(orderData);
      return order;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  // Delete an order by ID
  async deleteOrder(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.destroy();
      return order;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  // Buscar Mejores Clientes
  async buscarMejoresClientes() {
    try {
      const mejoresClientes = await Order.findAll({
        attributes: [
          'UserId',
          [Sequelize.fn('COUNT', Sequelize.col('UserId')), 'totalCompras']
        ],
        group: ['UserId'],
        order: [[Sequelize.literal('totalCompras'), 'DESC']],
        limit: 10, // Limitar a los 10 mejores clientes
        include: [{
          model: User,
          attributes: ['name', 'lastname', 'mail']
        }]
      });

      return mejoresClientes;
    } catch (error) {
      console.error("Error fetching best clients:", error);
      throw error;
    }
  }
}

export default OrderService;