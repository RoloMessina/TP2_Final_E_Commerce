import { Sequelize } from "sequelize";

const connection = new Sequelize("E_commerce", "sa", "ecommerce", {
  host: "ROLO-PC\\SQLEXPRESS",
  dialect: "mssql",
  port: 1433, // Puerto predeterminado para SQL Server
});

try {
  await connection.authenticate();
  console.log("La conexión a la base de datos se ha establecido con éxito.");
} catch (error) {
  console.error("No se pudo conectar a la base de datos:", error);
}

export default connection;

