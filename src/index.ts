// import { persons, products, purchases, createUsers, getAllUsers, createNewProduct, getAllProducts, getProductById } from "./database"
// import { PRODUCT } from "./types"

import express, { Request, Response } from "express";
import cors from "cors";
import { persons, products, purchases } from "./database";
import { user, PRODUCT, product, purchase } from "./types"

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//getAllUsers
app.get("/users", (req: Request, res: Response) => {
  res.send(persons);
});
//getAllProducts
app.get("/products", (req: Request, res: Response) => {
  res.send(products);
});
//searchProductsByName
app.get("/product/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = products.filter((product) => {
    if (q) {
      return product.name.toLowerCase().includes(q.toLowerCase());
    }
    return products;
  });
  res.status(200).send(result);
});
//createNewUser
app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    const newUser: user = {
        id,
        email,
        password,
    }
    persons.push(newUser)
    res.status(201).send("Usuario cadastrado com sucesso!")
})
//createNewProduct
app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as PRODUCT

    const newProduct: product = {
        id,
        name,
        price,
        category,
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})
//createPurchase
app.post("/purchases", (req: Request, res: Response) => {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const totalPrice = req.body.totalPrice as any;

    const newPurchase: purchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso!")
})

app.get("/purchases", (req: Request, res: Response) => {
    res.send(purchases)
})