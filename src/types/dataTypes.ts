export type Cart = {
  id: string;
  name: string;
  description: string;
  note: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export type Categories = {
  categories: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    products: {
      id: number;
      name: string;
      status: string;
      createdAt: Date;
      updatedAt: Date | null;
      description: string;
      price: number;
      categoryId: number;
    }[];
  }[];
};