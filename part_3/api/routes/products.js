const express = require('express');

const db = require('./database');

const app = express();

app.get('/products', (_, res) => {
    db.query("SELECT * FROM products", (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    db.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.put('/products/:id', (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params;

    db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM products WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

module.exports = app;