const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    orderId: { type: String, required: true},
});

module.exports = mongoose.model('Customer', CustomerSchema);