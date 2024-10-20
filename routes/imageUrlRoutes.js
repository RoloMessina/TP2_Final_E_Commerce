import { Router } from "express";
import ImageUrlController from "../controllers/imageUrlController.js";

const imageUrlController = new ImageUrlController();

const imageUrlRoutes = Router();

imageUrlRoutes.get("/", imageUrlController.getAllImageUrls);
imageUrlRoutes.get("/:id", imageUrlController.getImageUrlById);
imageUrlRoutes.post("/", imageUrlController.createImageUrl);
imageUrlRoutes.put("/:id", imageUrlController.updateImageUrl);
imageUrlRoutes.delete("/:id", imageUrlController.deleteImageUrl);

export default imageUrlRoutes;