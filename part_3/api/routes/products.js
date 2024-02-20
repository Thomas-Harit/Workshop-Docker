const express = require('express');

const db = require('./database');

const app = express();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The auto-generated id of the product.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the product.
 *                 example:
 *                   id: 1
 *                   name: Example Product Name
 *                   price: 9.99
 */

app.get('/products', (_, res) => {
    db.query("SELECT * FROM products", (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 */
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    db.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Updates a product by the id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was updated successfully
 */
app.put('/products/:id', (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params;

    db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Removes the product with the specified ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the product to delete
 *     responses:
 *       200:
 *         description: The product was deleted successfully
 */
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM products WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

module.exports = app;