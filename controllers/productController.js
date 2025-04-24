const Product = require('../models/Product');

exports.index = async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
};

exports.newForm = (req, res) => {
    res.render('new');
};

exports.create = async (req, res) => {
    await Product.create(req.body);
    res.redirect('/');
};

exports.editForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('edit', { product });
};

exports.update = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
};