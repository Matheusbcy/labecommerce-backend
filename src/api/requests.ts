import express, { Request, Response } from "express";
import { persons, products, purchases } from "../database";
import { PRODUCT } from "../types";

function getProductById(req: Request, res: Response): void {
  const id = req.params.id as string;

  const productByid = products.find((product) => product.id === id);

  if (productByid) {
    res.status(200).send("Objeto product encontrado!");
  }
  res.status(404).send("Objeto product não existe!");
}

function getUserPurchasesByUserId(req: Request, res: Response): void {
  const userId = req.params.id as string;

  const purchaseById = purchases.find((purchase) => purchase.userId === userId);

  if (purchaseById) {
    res.status(200).send("Array de compras do user encontrada!");
  }
  res.status(404).send("array de compras do user não existe!");
}

function deleteUserById(req: Request, res: Response): void {
  const id = req.params.id as string;

  const userDelete: number = persons.findIndex((person) => person.id === id);

  if (userDelete >= 0) {
    persons.splice(userDelete, 1);
  }
  res.status(200).send("Usuário deletado com sucesso!");
}

function deleteProductById(req: Request, res: Response): void {
  const id = req.params.id as string;

  const productDelete = products.findIndex((product) => product.id === id);

  if (productDelete >= 0) {
    products.splice(productDelete, 1);
  }
  res.status(200).send("Produto deletado com sucesso!");
}

function modifiedUser(req: Request, res: Response): void {
  const id = req.params.id as string;

  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const userModified = persons.find((person) => person.id === id);

  if (userModified) {
    userModified.email = newEmail || userModified.email;
    userModified.password = newPassword || userModified.password;
    res.status(200).send("Usuário atualizado com sucesso!");
  } else {
    res.status(400).send("Usuário não encontrado!");
  }
}

function modifiecProduct(req: Request, res: Response): void {
  const id = req.params.id as string;

  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as PRODUCT | undefined;

  const productModified = products.find((product) => product.id === id);

  if (productModified) {
    productModified.name = newName || productModified.name;
    productModified.price = isNaN(newPrice) ? productModified.price : newPrice;
    productModified.category = newCategory || productModified.category;

    res.status(200).send("Produto atualizado com sucesso!");
  } else {
    res.status(400).send("Produto não encontrado!");
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
