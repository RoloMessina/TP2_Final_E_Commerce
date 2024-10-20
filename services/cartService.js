import { Cart, CartItem, Product } from "../models/index.js";

class CartService {
  // Crear un nuevo carrito
  async createCart(userId, deliveryAddress, email) {
    try {
      const cart = await Cart.create({ UserId: userId, delivery_address: deliveryAddress, email });
      return cart;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  // Obtener el carrito de un usuario
  async getCartByUserId(userId) {
    try {
      const cart = await Cart.findOne({
        where: { UserId: userId },
        include: [{ model: CartItem, include: [Product] }],
      });
      return cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId, quantity) {
    try {
      const cartItem = await CartItem.findOne({ where: { CartId: cartId, ProductId: productId } });
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        await CartItem.create({ CartId: cartId, ProductId: productId, quantity });
      }
      return await this.getCartByUserId(cartId);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  }

  // Eliminar un producto del carrito
  async removeProductFromCart(cartId, productId) {
    try {
      const cartItem = await CartItem.findOne({ where: { CartId: cartId, ProductId: productId } });
      if (cartItem) {
        await cartItem.destroy();
      }
      return await this.getCartByUserId(cartId);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      throw error;
    }
  }
}

export default CartService;