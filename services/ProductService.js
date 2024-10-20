import { Product } from "../models/index.js";
import logger from "../middlewares/logger.js";
import sequelize from "../connection/connection.js";

class ProductService {
  // Create a new product
  async createProduct(productData) {
    const transaction = await sequelize.transaction(); // Iniciar transacción
    try {
      const product = await Product.create(productData, { transaction });
      await transaction.commit(); // Confirmar la transacción si todo sale bien
      return product;
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción si ocurre un error
      logger.error(`Failed to create product: ${error.message}`);
      throw new Error("Failed to create product");
    }
  }

  // Get all products
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      logger.error(`Failed to fetch products: ${error.message}`);
      throw new Error("Failed to fetch products");
    }
  }

  // Get a product by ID
  async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        logger.warn(`Product with ID ${id} not found`);
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      logger.error(`Failed to fetch product with ID ${id}: ${error.message}`);
      throw new Error("Failed to fetch product");
    }
  }

  // Update a product by ID
  async updateProduct(id, productData) {
    const transaction = await sequelize.transaction(); // Iniciar transacción
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        logger.warn(`Product with ID ${id} not found for update`);
        throw new Error("Product not found");
      }
      await product.update(productData, { transaction });
      await transaction.commit(); // Confirmar la transacción si todo sale bien
      return product;
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción si ocurre un error
      logger.error(`Failed to update product with ID ${id}: ${error.message}`);
      throw new Error("Failed to update product");
    }
  }

  // Delete a product by ID
  async deleteProduct(id) {
    const transaction = await sequelize.transaction(); // Iniciar transacción
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        logger.warn(`Product with ID ${id} not found for deletion`);
        throw new Error("Product not found");
      }
      await product.destroy({ transaction });
      await transaction.commit(); // Confirmar la transacción si todo sale bien
      return product;
    } catch (error) {
      await transaction.rollback(); // Revertir la transacción si ocurre un error
      logger.error(`Failed to delete product with ID ${id}: ${error.message}`);
      throw new Error("Failed to delete product");
    }
  }
}

export default ProductService;