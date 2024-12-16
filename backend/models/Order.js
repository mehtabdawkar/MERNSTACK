const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    customerEmail: { type: String, required: true },
    productName: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);