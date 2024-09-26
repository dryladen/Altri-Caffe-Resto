export type Cart = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  note: string;
  quantity: number;
  price: number;
  totalPrice: number;
  product_images : {
    id: string;
    product_id: string;
    image: string;
  }[];
}

export type Categories = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  products: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    price: number;
    status: string;
    categoryId: number;
  }[];
};

export type Product = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  description: string;
  price: number;
  status: string;
  categoryId: number;
};