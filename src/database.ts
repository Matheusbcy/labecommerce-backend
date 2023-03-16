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
    userId: persons[0].id ? persons[0].id : "ID de usuário não existe.",
    productId: persons[0].id
      ? products[0].id
      : "ID de usuario não possui produtos.",
    quantity: persons[0].id ? 2 : 0,
    totalPrice: persons[0].id
      ? (products.find((p) => p.id === "1")?.price ?? 0) * 2
      : "produtos não encontrados",
  },
  {
    userId: persons[1].id ? persons[1].id : "ID de usuário não existe.",
    productId: persons[1].id
      ? products[1].id
      : "ID de usuario não possui produtos.",
    quantity: persons[1].id ? 4 : 0,
    totalPrice: persons[1].id
      ? (products.find((p) => p.id === "1")?.price ?? 0) * 4
      : "produtos não encontrados",
  },
];
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
