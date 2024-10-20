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

  async findBestCustomer() {
    try {
      const orders = await Order.findAll({
        include: {
          model: User,
          attributes: ['id', 'name', 'lastname', 'mail']
        }
      });

      const customerTotals = {};

      orders.forEach(order => {
        const { UserId, totalprice, User } = order;
        if (!customerTotals[UserId]) {
          customerTotals[UserId] = {
            total: 0,
            user: User
          };
        }
        customerTotals[UserId].total += totalprice;
      });

      let bestCustomer = null;
      let highestTotal = 0;

      for (const userId in customerTotals) {
        if (customerTotals[userId].total > highestTotal) {
          highestTotal = customerTotals[userId].total;
          bestCustomer = customerTotals[userId].user;
        }
      }

      return bestCustomer;
    } catch (error) {
      console.error("Error finding best customer:", error);
      throw new Error(`Error finding best customer: ${error.message}`);
    }
  }
}

export default OrderService;