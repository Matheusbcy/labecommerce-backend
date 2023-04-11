-- Active: 1680819049363@@127.0.0.1@3306

-- CREATE TABLE
--     users (
--         id TEXT PRIMARY KEY UNIQUE NOT NULL,
--         name TEXT NOT NULL,
--         email TEXT NOT NULL UNIQUE
--     );

-- INSERT INTO
--     users (id, name, email)
-- VALUES (
--         "a001",
--         "Matheus Freitas",
--         "matheusbcy@gmail.com"
--     ), (
--         "a002",
--         "Clara Estérfane",
--         "clararibeiropsi@gmail.com"
--     ), (
--         "a003",
--         "Marcos Paulo",
--         "marcospaulo123@hotmail.com"
--     );

-- SELECT * FROM users;

-- DROP TABLE products;

-- CREATE TABLE
--     products (
--         id TEXT PRIMARY KEY UNIQUE NOT NULL,
--         name TEXT NOT NULL,
--         price REAL NOT NULL,
--         catergory TEXT NOT NULL
--     );

-- INSERT INTO
--     products (id, name, price, catergory)
-- VALUES (
--         "P001",
--         "Notebook Dell Inspiron 15",
--         4000.00,
--         "Eletrônicos"
--     ), (
--         "P002",
--         "Tênis Nike Air Max",
--         499.99,
--         "Roupas e Calçados"
--     ), (
--         "P003",
--         "Fone de Ouvido Bluetooth JBL",
--         199.90,
--         "Acessórios"
--     ), (
--         "P004",
--         "Camiseta Polo Ralph Lauren",
--         129.90,
--         "Roupas e Calçados"
--     ), (
--         "P005",
--         "Smartwatch Samsung Galaxy",
--         799.00,
--         "Eletrônicos"
--     );

-- SELECT * FROM products;

-- -- PROJETOOOO ---

-- -- Get All Users

-- SELECT * FROM users;

-- -- Get All Products

-- SELECT * FROM products;

-- -- Search Product by name

-- SELECT * FROM products WHERE name = "Tênis Nike Air Max";

-- -- Create User

-- INSERT INTO
--     users (id, name, email)
-- VALUES (
--         "u004",
--         "Roberto Carlos",
--         "u004@gmail.com"
--     );

-- -- Create Product

-- INSERT INTO
--     products (id, name, price, catergory)
-- VALUES (
--         "p006",
--         "Jaleco Feminino Sweet",
--         309,
--         "Roupas e Calçados"
--     );

-- -- Get Products by id

-- SELECT * FROM products WHERE id = "P001";

-- -- Delete User by id

-- DELETE FROM users WHERE id = "a002";

-- -- Delete Product by id

-- DELETE FROM products WHERE id = "P005";

-- -- Edit User by id

-- UPDATE users
-- SET
--     id = "a004",
--     name = "Victor Motta"
-- WHERE id = "u004";

-- -- Edit Product by id

-- UPDATE products
-- SET
--     name = "Conjunto De Roupa Feminina Decotada"
-- WHERE id = "P006";

-- -- Get All Users

-- SELECT * FROM users ORDER BY email ASC;

-- -- Get All Products versão 1

-- SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- -- Get All Products versão 2

-- SELECT *
-- FROM products
-- WHERE price >= 100 AND price <= 300
-- ORDER BY price ASC;

-- -- RELAÇÔES SQL --

-- CREATE TABLE
--     purchases (
--         id TEXT PRIMARY KEY UNIQUE NOT NULL,
--         total_price REAL NOT NULL,
--         paid INTEGER NOT NULL,
--         delivered_at TEXT,
--         buyer_id TEXT NOT NULL,
--         FOREIGN KEY (buyer_id) REFERENCES users(id)
--     );

-- INSERT INTO
--     purchases (id, total_price, paid, buyer_id)
-- VALUES ('p1', 50.0, 1, 'a001');

-- INSERT INTO
--     purchases (id, total_price, paid, buyer_id)
-- VALUES ('p2', 25.5, 1, 'a001');

-- INSERT INTO
--     purchases (id, total_price, paid, buyer_id)
-- VALUES ('p3', 10.0, 0, 'a003');

-- INSERT INTO
--     purchases (id, total_price, paid, buyer_id)
-- VALUES ('p4', 35.2, 1, 'a003');

-- UPDATE purchases
-- SET
--     delivered_at = DATETIME('2022-04-04 14:24:00')
-- WHERE id = 'p4';

-- SELECT
--     purchases.id,
--     purchases.total_price,
--     purchases.paid,
--     purchases.delivered_at,
--     purchases.buyer_id,
--     users.name,
--     users.email
-- FROM purchases
--     INNER JOIN users ON users.id = purchases.buyer_id;

-- DROP TABLE purchases_products;

-- SELECT * FROM purchases;

-- -- Relações SQL II

-- CREATE TABLE
--     purchases_products (
--         purchase_id TEXT NOT NULL,
--         product_id TEXT NOT NULL,
--         quantity INTEGER NOT NULL
--     );

-- INSERT INTO
--     purchases_products (
--         purchase_id,
--         product_id,
--         quantity
--     )
-- VALUES ('001', 'P001', 2), ('002', 'P002', 1), ('003', 'P003', 3);

-- SELECT * FROM purchases_products;

-- SELECT * FROM purchases_products
-- INNER JOIN products
-- INNER JOIN purchases;
