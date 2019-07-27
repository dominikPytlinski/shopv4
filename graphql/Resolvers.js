const UserModel = require('../models/User');
const RoleModel = require('../models/Role');

const Query = {
    users: async () => {
        const users = await UserModel.find({});
        return users.map(user => {
            return {
                ...user._doc,
                id: user._doc._id
            }
        });
    }
}

const User = {
    role: async (parent) => {
        return await RoleModel.findById(parent.roleId);
    }
}

module.exports = { Query, User };