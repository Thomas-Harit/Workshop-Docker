const express = require('express');

const db = require('./database');

const app = express();

app.get('/users', (_, res) => {
    db.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.put('/users/:id', (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;

    db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

module.exports = app;