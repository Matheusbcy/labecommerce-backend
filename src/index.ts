// import { persons, products, purchases, createUsers, getAllUsers, createNewProduct, getAllProducts, getProductById } from "./database"
// import { PRODUCT } from "./types"

import express, { Request, Response } from "express";
import cors from "cors";
import { persons, products, purchases } from "./database";
import { user, PRODUCT, product, purchase } from "./types";
import {
  deleteProductById,
  deleteUserById,
  getProductById,
  getUserPurchasesByUserId,
  modifiecProduct,
  modifiedUser,
} from "./api/requests";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//getAllUsers
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(persons);
  } catch (error) {
    res.status(500);
  }
});
//getAllProducts
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    res.status(500);
  }
});

//searchProductsByName
app.get("/product/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q) {
      if (q.length < 2) {
        res.status(404);
        throw new Error("Name deve possuir mais de uma letra.");
      }
    }
    const result = products.filter((product) => {
      if (q) {
        return product.name.toLowerCase().includes(q.toLowerCase());
      }
      return products;
    });
    res.status(200).send(result);
  } catch (error) {
    res.send(error.message);
  }
});

//createNewUser
app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (persons.some((user) => user.id === id)) {
      res.status(404);
      throw new Error("Id de usuario ja existe. tente outro id");
    }

    if (persons.some((user) => user.email === email)) {
      res.status(404);
      throw new Error("Email de usuario já existe. tente outro email.");
    }

    if (password.length < 8) {
      res.status(404);
      throw new Error("Senha deve contar no minimo 8 caracteres.");
    }

    const newUser: user = {
      id,
      email,
      password,
    };
    persons.push(newUser);
    res.status(201).send("Usuario cadastrado com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
});
//createNewProduct
app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as PRODUCT;

    if (products.some((product) => product.id === id)) {
      res.status(404);
      throw new Error("Id de produto ja existe. tente outro id");
    }
    if (name.length < 2) {
      res.status(404);
      throw new Error(
        "Novo nome do produto tem que ter no minimo 2 caracteres."
      );
    }
    if (price !== undefined) {
      if (price < 0) {
        res.status(404);
        throw new Error("Valor do produto deve ser maior que 0");
      }
    }
    if (!Object.values(PRODUCT).includes(category)) {
      res.status(404);
      throw new Error("Categoria de produto não existe.");
    }
    const newProduct: product = {
      id,
      name,
      price,
      category,
    };
    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
});
//createPurchase
app.post("/purchases", (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const totalPrice = req.body.totalPrice as any;

    if(purchases.some((p) => p.userId === userId)) {
      res.status(404)
      throw new Error("Id de usuario ja existe nas compras.");
    }
    if(purchases.some((p) => p.productId === productId)) {
      res.status(404)
      throw new Error("Id de produto ja existe nas compras.");
    }
    const newPurchase: purchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };
    purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/purchases", (req: Request, res: Response) => {
  res.send(purchases);
});

// --------------------------------------------

app.get("/products/:id", getProductById);

app.get("/users/:id/purchases", getUserPurchasesByUserId);

app.delete("/users/:id", deleteUserById);

app.delete("/products/:id", deleteProductById);

app.put("/users/:id", modifiedUser);

app.put("/products/:id", modifiecProduct);
