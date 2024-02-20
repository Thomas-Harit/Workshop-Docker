const express = require('express');

const db = require('./database');

const app = express();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management and retrieval
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Returns a list of orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The order ID.
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     description: The user ID associated with the order.
 *                     example: 1
 *                   product_id:
 *                     type: integer
 *                     description: The product ID.
 *                     example: 1
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the product ordered.
 *                     example: 2
 */
app.get('/orders', (_, res) => {
    db.query("SELECT * FROM orders", (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Creates a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The user ID.
 *                 required: true
 *               product_id:
 *                 type: integer
 *                 description: The product ID.
 *                 required: true
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product.
 *                 required: true
 *     responses:
 *       200:
 *         description: Order created successfully.
 */
app.post('/orders', (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    db.query("INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Updates an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order updated successfully.
 */
app.put('/orders/:id', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const { id } = req.params;

    db.query('UPDATE orders SET user_id = ?, product_id = ?, quantity = ? WHERE id = ?', [user_id, product_id, quantity, id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Deletes an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 */
app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM orders WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

module.exports = app;