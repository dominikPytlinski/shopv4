const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    pass: String,
    roleId: String,
    orders: [String]
});

module.exports = mongoose.model('User', userSchema);