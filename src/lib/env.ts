import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { z } from "zod";

const envDir = "envs";
const currentEnv = process.env.NODE_ENV;
const envFiles = [
  `${envDir}/.env`,
  currentEnv ? `${envDir}/.env.${currentEnv}` : "",
].filter(Boolean);

console.log(`Loading environment variables from: ${envFiles.join(", ")}`);
dotenvExpand.expand(
  dotenv.config({
    path: envFiles,
  }),
);

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_URL: z.url(),
});

export const env = envSchema.parse(process.env);
