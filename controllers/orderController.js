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
        // Find the product by id
        const product = await Product.findById(req.params.id);
        
        // Check if the product exists
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Create a new order with the product details
        await Order.create({
            product: product._id,  // Store the product id in the order
            name: product.name,
            price: product.price,
            description: product.description
        });


        const webhookUrl = 'https://hooks.zapier.com/hooks/catch/22643748/2xn0ysy/'; 

        // Send data to Zapier Webhook
        await axios.post(webhookUrl, {
            productId: product._id,
            name: product.name,
            price: product.price,
            description: product.description
        });

          res.status(201).json({
            message: 'Order created successfully',
            order: order
        });
    } catch (error) {
        // Handle errors if any
        console.error(error);
        res.status(500).send('Server error');
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
