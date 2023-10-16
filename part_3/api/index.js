const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');

/*
* Swagger 
*/
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Docker Workshop',
        version: "1.0",
    },
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const app = express();
const port = 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded());

app.use(users);
app.use(products);
app.use(orders);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Hello World!
 *     description: Send a Hello World! message.
*/
app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
