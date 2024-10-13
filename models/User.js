import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class User extends Model { }

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: { // Nuevo atributo
      type: DataTypes.DATE,
      allowNull: true,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

export default User;
