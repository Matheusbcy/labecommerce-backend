import { product, purchase, user, PRODUCT } from "./types";

const persons: user[] = [
  {
    id: "1",
    email: "matheusbcy@gmail.com",
    password: "bolinha123",
  },
  {
    id: "2",
    email: "clararibeiroziika@gmail.com",
    password: "euamocomida",
  },
];

const products: product[] = [
  {
    id: "1",
    name: "WaterCooler",
    price: 322,
    category: PRODUCT.ELECTRONICS,
  },
  {
    id: "2",
    name: "Placa-mae",
    price: 545,
    category: PRODUCT.ELECTRONICS,
  },
];

const purchases: purchase[] = [
  {
    userId: persons[0].id,
    productId: products[1].id,
    quantity: 3,
    totalPrice: products[1].price * 3,
  },
  {
    userId: persons[1].id,
    productId: products[0].id,
    quantity: 1,
    totalPrice: products[0].price * 1,
  },
];

export function createPurchase(
  userId: string,
  productId: string,
  quantity: number
): purchase {
  const product = products.find((p) => p.id === productId);
  const user = persons.find((u) => u.id === userId);

  if (!product) {
    throw new Error(`Produto com o ID ${productId} não encontrado`);
  }

  if (!user) {
    throw new Error(`Usuário com o ID ${userId} não encontrado`);
  }

  return {
    userId,
    productId,
    quantity,
    totalPrice: product.price * quantity,
  };
}

// TRATAMENTO DE USUARIOS
function createUsers(id: string, email: string, password: string): void {
  if (id && email && password) {
    const newPerson = {
      id,
      email,
      password,
    };
    persons.push(newPerson);
    return console.log(`Cadastro realizado com sucesso!`);
  }
}

function getAllUsers(): user[] {
  return persons.map((person) => {
    return person;
  });
}

// TRATAMENTO DE PRODUTOS
function createNewProduct(
  id: string,
  name: string,
  price: number,
  category: PRODUCT
): void {
  if (id && name && price && category) {
    const newProduct = {
      id,
      name,
      price,
      category,
    };
    products.push(newProduct);
    return console.log("Produto criado com sucesso!");
  }
}

function getAllProducts(): product[] {
  return products.map((product) => {
    return product;
  });
}

function getProductById(id: string): product[] {
  return products.filter((product) => product.id === id);
}

export {
  persons,
  products,
  purchases,
  createUsers,
  getAllUsers,
  createNewProduct,
  getAllProducts,
  getProductById,
};
