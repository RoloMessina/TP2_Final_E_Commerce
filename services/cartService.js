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

  // Generar una orden de compra
  async generateOrder(userId) {
    const transaction = await connection.transaction();
    try {
      const cart = await Cart.findOne({
        where: { UserId: userId },
        include: [{ model: CartItem, include: [Product] }],
        transaction,
      });

      if (!cart) {
        throw new Error("Cart not found");
      }

      const orderItems = cart.CartItems.map(item => ({
        ProductId: item.ProductId,
        quantity: item.quantity,
        price: item.Product.price,
      }));

      const totalprice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

      const order = await Order.create({
        UserId: userId,
        products: JSON.stringify(orderItems),
        delivery_address: cart.delivery_address,
        city: cart.city,
        state: cart.state,
        shipping: 0, // Puedes calcular el costo de envío aquí
        totalprice,
        status: 'PagoPendiente',
      }, { transaction });

      for (const item of cart.CartItems) {
        const product = await Product.findByPk(item.ProductId, { transaction });
        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for product ${product.name}`);
        }
        product.stock -= item.quantity;
        await product.save({ transaction });
      }

      await CartItem.destroy({ where: { CartId: cart.id }, transaction });
      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      console.error("Error generating order:", error);
      throw error;
    }
  }

}

export default CartService;