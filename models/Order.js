import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Order extends Model {}

Order.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('PagoPendiente', 'Confirmado', 'Preparado', 'Enviado', 'Cancelado'),
      allowNull: false,
      defaultValue: 'PagoPendiente',
    },
  },
  {
    sequelize: connection,
    modelName: "Order",
  }
);

export default Order;