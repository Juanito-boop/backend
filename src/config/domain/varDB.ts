import { config } from "dotenv";
config({ path: "./.env" });

export default {
    user : process.env.DB_USER || "postgres.oobnfscfdnisdbqlvznm",
    password: process.env.DB_PASSWORD || "cB0HpxVjvKl4pLXx",
    host: process.env.DB_HOST || "aws-0-us-west-1.pooler.supabase.com",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "postgres"
};
