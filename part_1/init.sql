-- Use the database

USE my_database;

-- Create a table for users

CREATE TABLE
    users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(50)
    );

-- Create a table for products

CREATE TABLE
    products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        price DECIMAL(10, 2),
        description TEXT
    );

-- Create a table for orders

CREATE TABLE
    orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        product_id INT,
        quantity INT,
        total_price DECIMAL(10, 2),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );