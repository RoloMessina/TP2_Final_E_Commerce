import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING, // URL de la imagen del producto
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING, // Categoría del producto
        allowNull: false,
      },
  },
  {
    sequelize: connection,
    modelName: "Product",
  }
);

export default Product;