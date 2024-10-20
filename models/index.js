import Role from "./Role.js";
import User from "./User.js";
import Product from './Product.js';
import Order from './Order.js';
import ImageUrl from "./ImageUrl.js";

// Relación de uno a muchos entre Role y User
Role.hasMany(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.belongsTo(Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relación de uno a muchos entre User y Order
User.hasMany(Order, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relación de uno a muchos entre Order y Product
User.hasMany(Order, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.hasMany(ImageUrl, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ImageUrl.belongsTo(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });


export { Role, User, Product, Order, ImageUrl};