/*import { Product } from "../models/index.js";

class ProductService {
  // Create a new product
  async createProduct(productData) {
    try {
      const product = await Product.create(productData);
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  // Get all products
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  // Get a product by ID
  async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  // Update a product by ID
  async updateProduct(id, productData) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await product.update(productData);
      return product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  // Delete a product by ID
  async deleteProduct(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await product.destroy();
      return product;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export default ProductService; */
import { Product, sequelize } from "../models/index.js";
import logger from "../middlewares/logger.js";

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
