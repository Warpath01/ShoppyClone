const Product = require('../models/Product');
const Order = require('../models/order');

exports.showOrders = async (req, res) => {
    const orders = await Order.find().populate('product');
    res.render('orders', { orders });
};

exports.createOrder = async (req, res) => {
    await Order.create({ product: req.params.id });
    res.redirect('/orders');
};

exports.deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect('/orders');
};