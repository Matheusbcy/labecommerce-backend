import express, { Request, Response } from "express";
import { persons, products, purchases } from "../database";
import { PRODUCT } from "../types";
import { db } from "../database/knex";

async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const result = await db.raw(`SELECT * FROM products WHERE id = "${id}"`);

    if (result.length > 0) {
      res.status(200).send("Produto encontrado no arquivo .db");
    } else {
      throw new Error("Product not found");
    }

  } catch (error) {
    res.send(error.message);
  }
}

async function getUserPurchasesByUserId(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const result = await db.raw(`SELECT * FROM purchases WHERE id = "${id}"`)

    if (result.length > 0){
      res.status(200).send("array de compras do user no arquivo .db")
    } else {
      throw new Error("Purchases not found.")
    }
  } catch (error) {
    res.send(error.message);
  }
}

function deleteUserById(req: Request, res: Response): void {
  try {
    const id = req.params.id as string;

    if (!persons.some((person) => person.id === id)) {
      res.status(404);
      throw new Error("ID de usuário não existe.");
    }

    const userDelete: number = persons.findIndex((person) => person.id === id);

    if (userDelete >= 0) {
      persons.splice(userDelete, 1);
    }
    res.status(200).send("Usuário deletado com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
}

function deleteProductById(req: Request, res: Response): void {
  try {
    const id = req.params.id as string;

    if (!products.some((product) => product.id === id)) {
      res.status(404);
      throw new Error("Id de produto não existe.");
    }

    const productDelete = products.findIndex((product) => product.id === id);

    if (productDelete >= 0) {
      products.splice(productDelete, 1);
    }
    res.status(200).send("Produto deletado com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
}

function modifiedUser(req: Request, res: Response): void {
  try {
    const id = req.params.id as string;

    if (!persons.some((user) => user.id === id)) {
      res.status(404);
      throw new Error("Id de usuário não existe.");
    }

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (newPassword !== undefined) {
      if (newPassword.length < 8) {
        res.status(404);
        throw new Error("Senha deve conter no minimo 8 caracteres.");
      }
    }
    if (newEmail !== undefined) {
      if (!newEmail.includes("@")) {
        res.status(404);
        throw new Error("Email deve conter @.");
      }
    }

    const userModified = persons.find((person) => person.id === id);

    if (userModified) {
      userModified.email = newEmail || userModified.email;
      userModified.password = newPassword || userModified.password;
      res.status(200).send("Usuário atualizado com sucesso!");
    } else {
      res.status(400).send("Usuário não encontrado!");
    }
  } catch (error) {
    res.send(error.message);
  }
}

function modifiecProduct(req: Request, res: Response): void {
  try {
    const id = req.params.id as string;

    if (!products.some((p) => p.id === id)) {
      res.status(404);
      throw new Error("Id de produto não existe.");
    }

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as PRODUCT | undefined;

    if (newName !== undefined) {
      if (newName.length < 2) {
        res.status(404);
        throw new Error("Nome do produto deve conter no minimo 2 caracteres.");
      }
    }
    if (newPrice !== undefined) {
      if (newPrice < 0) {
        res.status(404);
        throw new Error("Preço deve ser maior que 0.");
      }
    }
    if (newCategory !== undefined) {
      if (!Object.values(PRODUCT).includes(newCategory)) {
        res.status(404);
        throw new Error("Catergoria do produto não está cadastrado.");
      }
    }

    const productModified = products.find((product) => product.id === id);

    if (productModified) {
      productModified.name = newName || productModified.name;
      productModified.price = isNaN(newPrice)
        ? productModified.price
        : newPrice;
      productModified.category = newCategory || productModified.category;

      res.status(200).send("Produto atualizado com sucesso!");
    } else {
      res.status(400).send("Produto não encontrado!");
    }
  } catch (error) {
    res.send(error.message);
  }
}

export {
  getProductById,
  getUserPurchasesByUserId,
  deleteUserById,
  deleteProductById,
  modifiedUser,
  modifiecProduct,
};
