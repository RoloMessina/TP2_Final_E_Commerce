import { Product} from "../models/index.js";



// crear nuevo producto
export const createProduct = async (productData, user) => {
  if (!isAdmin(user)) {
    throw new Error("You do not have permission to create products");
  }
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// obtener producto por ID
export const getProductById = async (id) => {
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
};

// Actualizar producto por ID
export const updateProduct = async (id, productData, user) => {
  if (!isAdmin(user)) {
    throw new Error("You do not have permission to update products");
  }
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
};

// elimiar producto por ID
export const deleteProduct = async (id, user) => {
  if (!isAdmin(user)) {
    throw new Error("You do not have permission to delete products");
  }
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
};

// Funcion que verificia si el usuario es administrador
const isAdmin = (user) => {
  return user.RoleId === 1;
};