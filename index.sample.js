const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from Node API Server');
});


// API que mostra nossos produtos no JSON
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json( { message: error.message } );
    }
});


// Obter um produto específico, dependendo de seu ID
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json( { message: error.message } );
    }
});

// Criar produtos
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json( { message: error.message } );
    }
});


// Update de um produto
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) return res.status(404).json( { messago: 'Product not found.' } );

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json( { message: error.message } );
    }
});


mongoose.connect("mongodb+srv://userid:<password>@database.fxrggkz.mongodb.net/?retryWrites=true&w=majority&appName=db")
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => console.log('Connection failed!'));
