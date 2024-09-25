import { defineConfig } from "drizzle-kit";
import "@/app/config/config.ts";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dbCredentials: {
        url: process.env.POSTGRES_URL! + "?schema=public",
    },
    verbose: true,
    strict: true
});