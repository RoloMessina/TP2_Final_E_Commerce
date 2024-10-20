import { Product } from "../models/index.js";

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

export default ProductService;