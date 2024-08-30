// src/routes/api/products.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function get() {
  const products = await prisma.product.findMany();
  return {
    status: 200,
    body: products
  };
}
