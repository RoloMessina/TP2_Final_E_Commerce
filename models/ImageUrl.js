import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class ImageUrl extends Model {}

ImageUrl.init(
  {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "ImageUrl",
  }
);

export default ImageUrl;