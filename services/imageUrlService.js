import { ImageUrl } from "../models/index.js";

class ImageUrlService {
  // Crear una nueva URL de imagen
  async createImageUrl(imageUrlData) {
    try {
      const imageUrl = await ImageUrl.create(imageUrlData);
      return imageUrl;
    } catch (error) {
      console.error("Error creating image URL:", error);
      throw error;
    }
  }

  // Obtener todas las URLs de imagen
  async getAllImageUrls() {
    try {
      const imageUrls = await ImageUrl.findAll();
      return imageUrls;
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      throw error;
    }
  }

  // Obtener una URL de imagen por ID
  async getImageUrlById(id) {
    try {
      const imageUrl = await ImageUrl.findByPk(id);
      if (!imageUrl) {
        throw new Error("Image URL not found");
      }
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      throw error;
    }
  }

  // Actualizar una URL de imagen por ID
  async updateImageUrl(id, imageUrlData) {
    try {
      const imageUrl = await ImageUrl.findByPk(id);
      if (!imageUrl) {
        throw new Error("Image URL not found");
      }
      await imageUrl.update(imageUrlData);
      return imageUrl;
    } catch (error) {
      console.error("Error updating image URL:", error);
      throw error;
    }
  }

  // Eliminar una URL de imagen por ID
  async deleteImageUrl(id) {
    try {
      const imageUrl = await ImageUrl.findByPk(id);
      if (!imageUrl) {
        throw new Error("Image URL not found");
      }
      await imageUrl.destroy();
      return { success: true, message: "Image URL deleted successfully" };
    } catch (error) {
      console.error("Error deleting image URL:", error);
      throw error;
    }
  }
}

export default ImageUrlService;