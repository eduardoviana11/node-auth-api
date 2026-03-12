import 'dotenv/config';
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/index.js";

const DATABASE_URL = process.env.DATABASE_URL;

if(!DATABASE_URL) {
    throw new Error("Erro: DATABASE_URL não existente.");
}

const adapter = new PrismaPg({ connectionString: DATABASE_URL });

export const prisma = new PrismaClient({ adapter });