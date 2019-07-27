const UserModel = require('../models/User');
const RoleModel = require('../models/Role');
const CategoryModel = require('../models/Category');
const ProductModel = require('../models/Product');
const OrderModel = require('../models/Order');

const Query = {
    users: async () => {
        const users = await UserModel.find({});
        return users.map(user => {
            return {
                ...user._doc,
                id: user._doc._id
            }
        });
    },
    roles: async () => {
        const roles = await RoleModel.find({});
        return roles.map(role => {
            return {
                ...role._doc,
                id: role._doc._id
            }
        })
    },
    categories: async () => {
        const categories = await CategoryModel.find({});
        return categories.map(category => {
            return {
                ...category._doc,
                id: category._doc._id
            }
        });
    },
    products: async () => {
        const products = await ProductModel.find({});
        return products.map(product => {
            return {
                ...product._doc,
                id: product._doc._id
            }
        });
    },
    orders: async () => {
        const orders = await OrderModel.find({});
        return orders.map(order => {
            return {
                ...order._doc,
                id: order._doc._id
            }
        });
    }
}

const Order = {
    user: async (parent) => {
        return await UserModel.findById(parent.userId);
    },
    products: async (parent) => {
        return parent.products.map(product => {
            return product;
        });
    }
}

const OrderItem = {
    quantity: (parent) => {
        return parent[0];
    },
    product: async (parent) => {
        return await ProductModel.findById(parent[1]);
    }
}

const Product = {
    category: async (parent) => {
        return await CategoryModel.findById(parent.categoryId);
    }
}

const User = {
    role: async (parent) => {
        return await RoleModel.findById(parent.roleId);
    }
}

module.exports = { Query, User, Product, Order, OrderItem };