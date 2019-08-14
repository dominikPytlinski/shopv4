const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const RoleModel = require('../models/Role');
const CategoryModel = require('../models/Category');
const ProductModel = require('../models/Product');
const OrderModel = require('../models/Order');

const Query = {
    users: async (parent, args, context) => {
        if(!context.userId && context.role != 'admin') throw new Error('unauthorize');

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
    product: async (parent, args) => {
        return await ProductModel.findById(args.id);
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

const Mutation = {
    createUser: async (parent, args) => {
        const passwordHash = await bcrypt.hash(args.password, 12);
        let user = new UserModel({
            email: args.email,
            password: passwordHash,
            roleId: args.roleId
        });
        const newUser = await user.save();
        return {
            ...newUser._doc,
            id: newUser._doc._id
        }
    },
    login: async (parent, args) => {
        const user = await UserModel.findOne({ email: args.email });
        if(!user) throw new Error('Invalid credentials');

        const validPassword = await bcrypt.compare(args.password, user._doc.password);
        if(!validPassword) throw new Error('Invalid credentials');

        const role = await RoleModel.findById(user._doc.roleId);

        const token = jwt.sign({
            userId: user._doc._id,
            role: role.role
        }, process.env.APP_KEY, {
            expiresIn: '1200s'
        });

        return {
            token: token,
            userId: user._doc._id,
            role: user._doc.roleId
        }
    },
    addProduct: async (_, args, context) => {
        if(!context.userId && context.role != 'admin') throw new Error('unauthorize');

        const { name, desc, price, img, categoryId } = args;

        let product = new ProductModel({
            name,
            desc,
            img,
            price,
            categoryId
        });

        const newProduct = await product.save();

        return {
            ...newProduct._doc,
            id: newProduct._doc._id
        }
    }
}

const Auth = {
    role: async (parent) => {
        return await RoleModel.findById(parent.role);
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

module.exports = { Query, User, Product, Order, OrderItem, Mutation, Auth };