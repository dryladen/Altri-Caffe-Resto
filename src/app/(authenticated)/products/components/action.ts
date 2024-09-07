"use server"
import { db } from '@/db';
import { productSchema, ProductSchema, productsTable } from '@/db/schema';
import React from 'react'

async function createProduct(data: ProductSchema) {
  const validatedData = productSchema.parse(data);
  
  const response = await db.insert(productsTable).values(validatedData);
  console.log(response);
}

export default createProduct;