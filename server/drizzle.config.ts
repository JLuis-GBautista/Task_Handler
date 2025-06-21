import { defineConfig, Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({path: ".env.dev"});

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schemas/*.ts",
  out: "drizzle",
    dbCredentials: {
    url: process.env.DATABASE_URL!
  },
}) satisfies Config;