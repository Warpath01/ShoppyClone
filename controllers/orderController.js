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
        const productId = req.params.id;

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Create the order
        await Order.create({ product: productId });

        // Prepare webhook payload
       const webhookUrl = process.env.WEBHOOK_URL; // replace with actual URL
       const payload = {
  product_name: product.name,
  product_price: product.price,
  product_description: product.description
};

await axios.post(webhookUrl, payload, {
  headers: {
    'Content-Type': 'application/json'
  }
});

        // Redirect after success
        res.redirect('/orders');
    } catch (error) {
        console.error('Error creating order or sending webhook:', error);
        res.status(500).send('Internal Server Error');
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
