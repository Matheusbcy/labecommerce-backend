export enum PRODUCT {
  ACCESSORIES = "Acessórios",
  CLOTHES_AND_SHOES = "Roupas e calçados",
  ELECTRONICS = "Eletrônicos",
}

export type user = {
  id: string;
  email: string;
  password: string;
};
export type product = {
  id: string;
  name: string;
  price: number;
  category: PRODUCT;
};
export type purchase = {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: any;
};
