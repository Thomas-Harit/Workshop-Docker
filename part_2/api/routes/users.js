const express = require('express');

const db = require('./database');

const app = express();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   password:
 *                     type: string
 *                 required:
 *                   - name
 *                   - email
 *                   - password
 */
app.get('/users', (_, res) => {
    db.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: The user was successfully created
 */
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates a user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was updated successfully
 */
app.put('/users/:id', (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;

    db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Removes the user with the specified ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user to delete
 *     responses:
 *       200:
 *         description: The user was deleted successfully
 */
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

module.exports = app;