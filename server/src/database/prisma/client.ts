import { PrismaClient } from "../../generated/prisma/client";
import {
  PrismaClientOptions,
  Subset,
} from "../../generated/prisma/internal/prismaNamespace";

export const prismaClient = new PrismaClient(
  {} as Subset<PrismaClientOptions, PrismaClientOptions>,
);
