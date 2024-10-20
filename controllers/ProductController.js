import ProductService from "../services/ProductService.js";
import UserService from "../services/UserService.js";

class ProductController {
  productService = new ProductService();
  userService = new UserService();

  // Create a new product
  createProduct = async (req, res) => {
    try {
      if (!req.body.name || !req.body.price) {
        return res.status(400).send({
          success: false,
          message: "Product name and price are required",
          data: null,
        });
      }
      const product = await this.productService.createProduct(req.body);
      res.status(201).send({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to create product",
        error: error.message,
      });
    }
  };

  // Get all products
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).send({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  };

  // Get a product by ID
  getProductById = async (req, res) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
          data: null,
        });
      }
      res.status(200).send({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to fetch product",
        error: error.message,
      });
    }
  };

  // Update a product by ID
  updateProduct = async (req, res) => {
    try {
      if (!req.body.name && !req.body.price) {
        return res.status(400).send({
          success: false,
          message: "Product name or price must be provided for update",
          data: null,
        });
      }
      const product = await this.productService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
          data: null,
        });
      }
      res.status(200).send({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to update product",
        error: error.message,
      });
    }
  };

  // Delete a product by ID
  deleteProduct = async (req, res) => {
    try {
      const product = await this.productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
          data: null,
        });
      }
      res.status(200).send({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to delete product",
        error: error.message,
      });
    }
  };
}

export default ProductController;
