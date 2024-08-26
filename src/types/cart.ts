import { UUID } from "crypto";

export type Cart = {
  id: string;
  name: string
  note: string;
  quantity: number;
  price: number;
  totalPrice: number;
}