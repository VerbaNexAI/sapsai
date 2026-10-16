import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const localEnv = path.resolve(process.cwd(), ".env");
const rootEnv = path.resolve(process.cwd(), "../.env");
const rootEnvProd = path.resolve(process.cwd(), "../.env.prod");

if (!process.env.DATABASE_URL) {
  if (fs.existsSync(localEnv)) {
    dotenv.config({ path: localEnv });
  } else if (process.env.NODE_ENV === "production" && fs.existsSync(rootEnvProd)) {
    dotenv.config({ path: rootEnvProd });
  } else if (fs.existsSync(rootEnv)) {
    dotenv.config({ path: rootEnv });
  }
}
