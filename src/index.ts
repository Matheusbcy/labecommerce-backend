// import { persons, products, purchases, createUsers, getAllUsers, createNewProduct, getAllProducts, getProductById } from "./database"
// import { PRODUCT } from "./types"

import express, { Request, Response } from "express";
import cors from "cors";
import { createPurchase, persons, products, purchases } from "./database";
import { user, PRODUCT, product, purchase } from "./types";
import {
  deleteProductById,
  deleteUserById,
  getProductById,
  getUserPurchasesByUserId,
  modifiecProduct,
  modifiedUser,
} from "./api/requests";
import { db } from "./database/knex";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//getAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM users`);
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
  }
});

//getAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM products`);
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
  }
});

//searchProductsByName
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q) {
      if (q.length < 2) {
        res.status(404);
        throw new Error("Name deve possuir mais de uma letra.");
      }
    }
    const result = await db.raw(`SELECT * FROM products WHERE name = "${q}"`);

    res.status(200).send(result);
  } catch (error) {
    res.send(error.message);
  }
});

//createNewUser
app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (password.length < 8) {
      throw new Error("Senha deve contar no minimo 8 caracteres.");
    }
    if (!email.includes("@")) {
      throw new Error("Email deve conter @");
    }

    if (!id || !email || !name || !password) {
      throw new Error("Dados invalidos.");
    }

    await db.raw(`
      INSERT INTO users(id, name, email, password)
      VALUES ("${id}", "${name}", "${email}", "${password}")
    `);

    res.status(201).send("Usuario cadastrado com sucesso!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//createNewProduct
app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imagemUrl = req.body.url as string;

    if (name.length < 2) {
      throw new Error(
        "Novo nome do produto tem que ter no minimo 2 caracteres."
      );
    }
    if (price !== undefined) {
      if (price < 0) {
        throw new Error("Valor do produto deve ser maior que 0");
      }
    }

    if (!id || !name || !price || !description || !imagemUrl) {
      throw new Error("Dados invalidos.");
    }

    await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES("${id}","${name}",${price},"${description}", "${imagemUrl}")
    `);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//createPurchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const idBuyer = req.body.idBuyer as string;
    const totalPrice = req.body.totalPrice as number;
    const paid = req.body.paid as number;

    if (!id || !idBuyer || !totalPrice) {
      throw new Error("Dados invalidos.");
    }

    await db.raw(`
      INSERT INTO purchases(id, buyer, total_price, paid)
      VALUES("${id}","${idBuyer}",${totalPrice},${paid})
    `);
    
    res.status(201).send("Compra realizada com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM purchases`)
    res.send(result);
  } catch (error) {
    res.send("Houve um erro inesperado");
  }
});

// --------------------------------------------

app.get("/products/:id", getProductById);

app.get("/users/:id/purchases", getUserPurchasesByUserId);

app.delete("/users/:id", deleteUserById);

app.delete("/products/:id", deleteProductById);

app.put("/users/:id", modifiedUser);

app.put("/products/:id", modifiecProduct);
