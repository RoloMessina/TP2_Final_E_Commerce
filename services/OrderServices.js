import { Order } from "../models/index.js";

// Function to check if the user is an admin
const isAdmin = (user) => {
  return user.RoleId === 1;
};

// Crear Nueva Orden
export const createOrder = async (orderData, user) => {
  if (!isAdmin(user)) {
    throw new Error("You do not have permission to create orders");
  }
  try {
    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Obtener todas las ordenes
export const getAllOrders = async () => {
  try {
    const orders = await Order.findAll();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Obtener Orden por ID
export const getOrderById = async (id) => {
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
};

// Actualizar orden por ID
export const updateOrder = async (id, orderData, user) => {
  if (!isAdmin(user)) {
    throw new Error("You do not have permission to update orders");
  }
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
};

// eliminar orden por ID
export const deleteOrder = async (id, user) => {
  if (!isAdmin(user)) {
    throw new Error("You do not have permission to delete orders");
  }
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
};