const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Order = require('../models/Order');
// POST route might be used to receive data from the frontend and save it to the database.
router.post('/login', async (req, res) => {
    const { email, phone, password, orderId } = req.body;

    try {
        if (password) {
            const customer = await Customer.findOne({ email, password });
            if (!customer) return res.status(401).json({ message: 'Invalid credentials' });
            res.json({ email: customer.email });
        } else if (orderId) {
            const order = await Order.findOne({ orderId, customerEmail: email || phone });
            if (!order) return res.status(401).json({ message: 'Order not found' });
            res.json({ email: order.customerEmail });
        } else {
            res.status(400).json({ message: 'Missing parameters' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;