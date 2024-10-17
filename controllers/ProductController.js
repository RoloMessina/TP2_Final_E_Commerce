import ProductService from "../services/ProductService.js";
import UserService from "../services/UserService.js";

class ProductController {
  productService = new ProductService();
  userService = new UserService();

  // Funcion que verifica si el usuario es administrador
  isAdmin = (user) => {
    return user.RoleId === 1;
  };

  // Crear nuevo producto
  createProduct = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.user.id);
      if (!this.isAdmin(user)) {
        return res.status(403).send({ success: false, message: "You do not have permission to create products" });
      }
      const product = await this.productService.createProduct(req.body, user);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Obtener todos los productos
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).send({ success: true, message: products });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Buscar producto por ID
  getProductById = async (req, res) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Actualizar producto por ID
  updateProduct = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.user.id);
      if (!this.isAdmin(user)) {
        return res.status(403).send({ success: false, message: "You do not have permission to update products" });
      }
      const product = await this.productService.updateProduct(req.params.id, req.body, user);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // Eliminar producto por ID
  deleteProduct = async (req, res) => {
    try {
      const user = await this.userService.getUserByIdService(req.user.id);
      if (!this.isAdmin(user)) {
        return res.status(403).send({ success: false, message: "You do not have permission to delete products" });
      }
      const product = await this.productService.deleteProduct(req.params.id, user);
      res.status(200).send({ success: true, message: product });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
}

export default ProductController;