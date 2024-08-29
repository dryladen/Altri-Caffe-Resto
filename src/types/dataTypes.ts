export type Cart = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  note: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export type Categories = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  description: string;
  price: number;
  categoryId: number;
};