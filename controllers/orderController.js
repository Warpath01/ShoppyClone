const Product = require('../models/Product');
const Order = require('../models/order');
const axios = require('axios');

exports.showOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch orders.');
    }
};

exports.createOrder = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found.');
        }
        await Order.create({ product: req.params.id });

        const webhookUrl = 'https://hooks.zapier.com/hooks/catch/22643748/2xn0ysy/'; // Replace with your actual Zapier URL
        await axios.post(webhookUrl, {
            productId,
            quantity,
            totalAmount,
            customerId,
            status,
        });
        
         res.json(order);
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to create order.');
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).send('Order not found.');
        }

        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete order.');
    }
};
