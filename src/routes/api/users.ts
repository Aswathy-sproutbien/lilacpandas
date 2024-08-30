// src/routes/api/users.ts
import prisma from '$lib/prisma'

export async function get() {
  const users = await prisma.user.findMany();
  return {
    status: 200,
    body: users,
  };
}
