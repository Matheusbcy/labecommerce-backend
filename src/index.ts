import express, { Request, Response } from "express";
import cors from "cors";
import {
  deleteProductById,
  deletePurchaseById,
  deleteUserById,
  getProductById,
  getUserPurchasesByUserId,
  modifiecProduct,
  modifiedUser,
} from "./api/requests";
import { db } from "./database/knex";

interface RequestBody {
  id: string;
  idBuyer: string;
  paid: number;
  products: Array<{
    id: string;
    quantity: number;
  }>;
}

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//getAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
  }
});

//getAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
  }
});

//searchProductsByName
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    if (name) {
      if (name.length < 2) {
        res.status(404);
        throw new Error("Name deve possuir mais de uma letra.");
      }
    }

    const result = await db("products").where({ name: name });

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

    const newUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

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

    const newProduct = {
      id,
      name,
      price,
      description,
      image_url: imagemUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//createPurchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, idBuyer, paid, products } = req.body as RequestBody;

    const buyer = await db("users").where({ id: idBuyer }).first();
    if (!buyer) {
      throw new Error(`O comprador com o ID ${idBuyer} não foi encontrado.`);
    }

    const [purchase] = await db("purchases").where({id : id})

    if(purchase) {
      throw new Error ("Já existe uma compra com esse id.")
    }

    if (!id || !idBuyer || !paid || !products) {
      throw new Error("Dados inválidos.");
    }
    
    let totalPrice = 0;
    
    const newPurchase = {
      id,
      buyer: idBuyer,
      total_price: totalPrice,
      paid,
    };
    await db("purchases").insert(newPurchase);

    for (const { id: productId, quantity } of products) {
      const product = await db("products").where({ id: productId }).first();
      if (!product) {
        throw new Error(`O produto com o ID ${productId} não foi encontrado.`);
      }
      
      const newPurchasesProducts = {
        purchase_id: id,
        product_id: productId,
        quantity,
      };
      await db("purchases_products").insert(newPurchasesProducts);
      
      totalPrice += product.price * quantity;
    }
    
    await db("purchases")
      .where({ id })
      .update({ total_price: totalPrice });

    res.status(200).send("Compra realizada com sucesso!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db("purchases");
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

app.delete("/purchases/:id", deletePurchaseById)
