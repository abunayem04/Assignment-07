import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");
const db = client.db(process.env.MONGODB_DB_NAME || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_super_secret_session_key_2026_assignment7",
  baseURL: (process.env.BETTER_AUTH_URL || "http://localhost:3000").trim().replace(/\/+$/, ""),
  trustedOrigins: [
    "http://localhost:3000",
    "https://assignment-07-nine-rho.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID || "").trim(),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim(),
    },
    github: {
      clientId: (process.env.GITHUB_CLIENT_ID || "").trim(),
      clientSecret: (process.env.GITHUB_CLIENT_SECRET || "").trim(),
    },
  },
});
