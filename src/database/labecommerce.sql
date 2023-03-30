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

    SELECT * FROM products