import express, { Request, Response } from "express";
import { db } from "../database/knex";

async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!id) {
      throw new Error("Procure um produto por um id.");
    }

    if (id.length < 1) {
      throw new Error("o Id deve ser maios que 1");
    }

    const result = await db("products").where({ id });

    if (result.length > 0) {
      res.status(200).send("Produto encontrado no banco de dados");
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    res.send(error.message);
  }
}

async function getUserPurchasesByUserId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Digite um id para pesquisar nas compras");
    }

    const result = await db("users")
      .innerJoin("purchases", "users.id", "purchases.buyer")
      .innerJoin(
        "purchases_products",
        "purchases.id",
        "purchases_products.purchase_id"
      )
      .innerJoin("products", "products.id", "purchases_products.product_id")
      .select(
        "purchases.id as purchaseId",
        "purchases.total_price as totalPrice",
        "users.created_at as createdAt",
        "purchases.paid as isPaid",
        "purchases.buyer as buyerId",
        "users.email as email",
        "users.name as name",
        "products.*",
        "purchases_products.quantity"
      )
      .where("purchases.id", id)
      .groupBy("purchases.id", "users.id", "products.id");

    let totalPrice = 0;

    const productsList = result.map((row) => {
      const { id, name, price, description, image_url, quantity } = row;

      totalPrice += price * quantity;

      return { id, name, price, description, imageUrl: image_url, quantity };
    });

    result[0].totalPrice = totalPrice;

    const response = {
      purchaseId: result[0].purchaseId,
      totalPrice: result[0].totalPrice,
      createdAt: result[0].createdAt,
      isPaid: result[0].isPaid,
      buyerId: result[0].buyerId,
      email: result[0].email,
      productsList,
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUserById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await db("purchases_products")
      .whereIn("purchase_id", db("purchases").select("id").where("buyer", id))
      .del();

    await db("purchases").where("buyer", id).del();
    await db("users").where({ id }).del();

    res.status(200).send("Usuário deletado com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
}

async function deletePurchaseById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await db("purchases_products").where("purchase_id", id).delete();
    await db("purchases").where({ id: id }).delete();

    res.status(200).send("Compra deletada com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
}

async function deleteProductById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await db("purchases_products").whereIn("product_id", [id]).del();
    await db("products").where({ id: id }).del();

    res.status(200).send("Produto deletado com sucesso!");
  } catch (error) {
    res.send(error.message);
  }
}

async function modifiedUser(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const newId = req.body.id as string;
    const newName = req.body.name as string;
    const newEmail = req.body.email as string;
    const newPassword = req.body.password as string;

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

    const [user] = await db("users").where({ id });

    if (user) {
      const updatedUser = {
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };

      await db("users").update(updatedUser).where({ id });
      res.status(200).send("Usuário atualizado com sucesso.");
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }
  } catch (error) {
    res.send(error.message);
  }
}

async function modifiecProduct(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const newId = req.body.id as string;
    const newName = req.body.name as string;
    const newPrice = req.body.price as number;
    const newDescription = req.body.description as string;
    const newUrl = req.body.url as string;

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

    const [product] = await db("products").where({ id });

    if (product) {
      const newProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newUrl || product.image_url,
      };
      await db("products").update(newProduct).where({ id });
      res.status(200).send("Produto atualizado com sucesso.");
    } else {
      res.status(404);
      throw new Error("Id de produto não encontrado");
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
  deletePurchaseById,
};
