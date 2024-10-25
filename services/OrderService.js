import { Order, User } from "../models/index.js";

class OrderService {
  // Crear una nueva orden
  async createOrder(orderData) {
    try {
      const order = await Order.create(orderData);
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Obtener todas las órdenes
  async getAllOrders() {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  // Obtener una orden por ID
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

  // Actualizar una orden por ID
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

  // Eliminar una orden por ID
  async deleteOrder(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.destroy();
      return { success: true, message: "Order deleted successfully" };
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
  
  // Obtener órdenes pendientes
  async getPendingOrders() {
    try {
      const pendingOrders = await Order.findAll({
        where: { status: 'PagoPendiente' }
      });
      const count = pendingOrders.length;
      return { count, orders: pendingOrders };
    } catch (error) {
      console.error("Error fetching pending orders:", error);
      throw error;
    }
  }

  // Obtener órdenes confirmadas
  async getConfirmedOrders() {
    try {
      const confirmedOrders = await Order.findAll({
        where: { status: 'Confirmado' }
      });
      const count = confirmedOrders.length;
      return { count, orders: confirmedOrders };
    } catch (error) {
      console.error("Error fetching confirmed orders:", error);
      throw error;
    }
  }
// Obtener órdenes preparadas
  async getPreparedOrders() {
    try {
      const confirmedOrders = await Order.findAll({
        where: { status: 'Preparado' }
      });
      const count = confirmedOrders.length;
      return { count, orders: confirmedOrders };
    } catch (error) {
      console.error("Error fetching confirmed orders:", error);
      throw error;
    }
  }
  // Obtener órdene enviadas
  async getSentOrders() {
    try {
      const confirmedOrders = await Order.findAll({
        where: { status: 'Enviado' }
      });
      const count = confirmedOrders.length;
      return { count, orders: confirmedOrders };
    } catch (error) {
      console.error("Error fetching confirmed orders:", error);
      throw error;
    }
  } 

  // Cambiar el estado de la orden a Confirmado
  async confirmOrder(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.update({ status: 'Confirmado' });
      return order;
    } catch (error) {
      console.error("Error confirming order:", error);
      throw error;
    }
  }

  // Cambiar el estado de la orden a Preparado
  async prepareOrder(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.update({ status: 'Preparado' });
      return order;
    } catch (error) {
      console.error("Error preparing order:", error);
      throw error;
    }
  }

  // Cambiar el estado de la orden a Enviado
  async sendOrder(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }
      await order.update({ status: 'Enviado' });
      return order;
    } catch (error) {
      console.error("Error sending order:", error);
      throw error;
    }
  }
  
  // Obtener órdenes enviadas
  async getSentOrders() {
    try {
      const sentOrders = await Order.findAll({
        where: { status: 'Enviado' }
      });
      const count = sentOrders.length;
      return { count, orders: sentOrders };
    } catch (error) {
      console.error("Error fetching sent orders:", error);
      throw error;
    }
  }

  async cancelOrder(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw new Error("Order not found");
      }

      const products = JSON.parse(order.products);
      for (const item of products) {
        const product = await Product.findByPk(item.ProductId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }

      await order.update({ status: 'Cancelado' });
      return order;
    } catch (error) {
      console.error("Error canceling order:", error);
      throw error;
    }
  }

}

export default OrderService;