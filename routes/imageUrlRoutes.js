import { Router } from "express";
import ImageUrlController from "../controllers/imageUrlController.js";

const imageUrlControllerInstance = new ImageUrlController();

const imageUrlRoutes = Router();

imageUrlRoutes.get("/", imageUrlControllerInstance.getAllImageUrls);
imageUrlRoutes.get("/:id", imageUrlControllerInstance.getImageUrlById);
imageUrlRoutes.post("/", imageUrlControllerInstance.createImageUrl);
imageUrlRoutes.put("/:id", imageUrlControllerInstance.updateImageUrl);
imageUrlRoutes.delete("/:id", imageUrlControllerInstance.deleteImageUrl);

export default imageUrlRoutes;