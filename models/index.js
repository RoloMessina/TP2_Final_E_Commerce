import Role from "./Role.js";
import User from "./User.js";
import Product from './Product.js';
import Order from './Order.js';

Role.hasMany(User)
User.belongsTo(Role)
Order.hasMany(Product)
Product.belongsTo(Order)




export  { Role, User, Product, Order };
