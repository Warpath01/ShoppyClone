const Product = require('../models/Product');
const Order = require('../models/order');

exports.showOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product');
        res.render('orders', { orders });
        res.status(200).json({ success: true, orders });
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
