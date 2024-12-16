const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    const { email, orderId } = req.query;

    try {
        let orders;
        if (orderId) {
            // Fetch specific order by orderId
            orders = await Order.findOne({ orderId });
            if (!orders) return res.status(404).json({ message: 'Order not found' });
        } else if (email) {
            // Fetch all orders for a given email
            orders = await Order.find({ customerEmail: email });
        } else {
            return res.status(400).json({ message: 'Email or Order ID required' });
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/cancel', async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findOneAndUpdate(
            { orderId },
            { status: 'Cancelled' },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/escalate', async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findOneAndUpdate(
            { orderId },
            { status: 'Escalated' },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
