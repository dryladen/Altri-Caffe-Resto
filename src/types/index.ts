import { z } from "zod";

export type Cart = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  note: string;
  quantity: number;
  price: number;
  totalPrice: number;
  product_images: {
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

export interface UserRole {
  id: string;
  updated_at: string;
  username: string;
  avatar_url: string;
  email: string;
  role: string;
}

export const UserSchema = z.union([z.object({
  mode: z.literal("create"),
  username: z.string().min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  email: z.string().email("Email tidak valid"),
  role: z
    .string()
    .min(2, "Role tidak boleh kosong")
    .max(50, "Maksimal 50 kata"),
  password: z.string().min(6, "Minimal 6 kata").max(50, "Maksimal 50 kata"),
}), z.object({
  mode: z.literal("update"),
  id: z.string().min(1),
  username: z.string().min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  email: z.string().email("Email tidak valid"),
  role: z
    .string()
    .min(2, "Role tidak boleh kosong")
    .max(50, "Maksimal 50 kata"),
  password: z.string().min(6, "Minimal 6 kata").max(50, "Maksimal 50 kata"),
}),
]);

export type UserSchema = z.infer<typeof UserSchema>;