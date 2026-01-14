import { PrismaClient } from "@prisma/client";

export type deleteMiddlewareAnswer = { message: string; data?: any } | Error;

const prisma = new PrismaClient();

export const modelTypes = {
  user: prisma.user,
  service: prisma.service,
};
export type modelType = keyof typeof modelTypes;
