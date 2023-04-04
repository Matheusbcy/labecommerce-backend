-- Active: 1680010419360@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    );

INSERT INTO
    users (id, name, email)
VALUES (
        "a001",
        "Matheus Freitas",
        "matheusbcy@gmail.com"
    ), (
        "a002",
        "Clara Estérfane",
        "clararibeiropsi@gmail.com"
    ), (
        "a003",
        "Marcos Paulo",
        "marcospaulo123@hotmail.com"
    );

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        catergory TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, catergory)
VALUES (
        "P001",
        "Notebook Dell Inspiron 15",
        4000.00,
        "Eletrônicos"
    ), (
        "P002",
        "Tênis Nike Air Max",
        499.99,
        "Roupas e Calçados"
    ), (
        "P003",
        "Fone de Ouvido Bluetooth JBL",
        199.90,
        "Acessórios"
    ), (
        "P004",
        "Camiseta Polo Ralph Lauren",
        129.90,
        "Roupas e Calçados"
    ), (
        "P005",
        "Smartwatch Samsung Galaxy",
        799.00,
        "Eletrônicos"
    );

SELECT * FROM products;

-- PROJETOOOO ---

-- Get All Users

SELECT * FROM users;

-- Get All Products

SELECT * FROM products;

-- Search Product by name

SELECT * FROM products WHERE name = "Tênis Nike Air Max";

-- Create User

INSERT INTO
    users (id, name, email)
VALUES (
        "u004",
        "Roberto Carlos",
        "u004@gmail.com"
    );

-- Create Product

INSERT INTO
    products (id, name, price, catergory)
VALUES (
        "p006",
        "Jaleco Feminino Sweet",
        309,
        "Roupas e Calçados"
    );

-- Get Products by id

SELECT * FROM products WHERE id = "P001";

-- Delete User by id

DELETE FROM users WHERE id = "a002";

-- Delete Product by id

DELETE FROM products WHERE id = "P005";

-- Edit User by id

UPDATE users
SET
    id = "a004",
    name = "Victor Motta"
WHERE id = "u004";

-- Edit Product by id

UPDATE products
SET
    name = "Conjunto De Roupa Feminina Decotada"
WHERE id = "P006";

-- Get All Users

SELECT * FROM users ORDER BY email ASC;

-- Get All Products versão 1

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Get All Products versão 2

SELECT *
FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;

-- RELAÇÔES SQL --

