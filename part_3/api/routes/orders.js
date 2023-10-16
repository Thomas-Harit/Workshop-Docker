const express = require('express');

const db = require('./database');

const app = express();

app.get('/orders', (_, res) => {
    db.query("SELECT * FROM orders", (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.post('/orders', (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;

    db.query("INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.put('/orders/:id', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const { id } = req.params;

    db.query('UPDATE orders SET user_id = ?, product_id = ?, quantity = ? WHERE id = ?', [user_id, product_id, quantity, id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM orders WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

module.exports = app;