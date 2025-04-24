require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => seed())
    .catch(err => console.error(err));

async function seed() {
    await Product.deleteMany();
    await Product.insertMany([
        { name: 'Smartphone', price: 699, description: 'Latest model with high-resolution display' },
        { name: 'Laptop', price: 1299, description: 'Lightweight laptop with powerful performance' },
        { name: 'Smartwatch', price: 199, description: 'Fitness tracking and notifications on your wrist' },
        { name: 'Wireless Earbuds', price: 149, description: 'Noise-cancelling and long battery life' },
        { name: 'Tablet', price: 499, description: 'Portable touchscreen device great for media and work' },
        { name: 'Bluetooth Speaker', price: 99, description: 'Portable speaker with rich sound' },
        { name: 'Gaming Console', price: 399, description: 'Next-gen console for immersive gaming' },
        { name: 'Drone', price: 899, description: 'Camera drone with 4K video and GPS tracking' },
        { name: 'Action Camera', price: 299, description: 'Waterproof camera ideal for adventure shots' },
        { name: 'E-Reader', price: 129, description: 'E-ink display perfect for reading in any light' }
    ]);
    console.log('Database seeded with gadgets');
    mongoose.connection.close();
}
