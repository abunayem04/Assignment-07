import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import Database from "better-sqlite3";
import path from "path";

function getDatabaseAdapter() {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    const client = new MongoClient(mongoUri);
    const db = client.db(process.env.MONGODB_DB_NAME || "bazardor");
    return mongodbAdapter(db);
  }

  const dbPath = path.join(process.cwd(), "auth.db");
  return new Database(dbPath);
}

export const auth = betterAuth({
  database: getDatabaseAdapter(),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_super_secret_session_key_2026_assignment7",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "mock-github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock-github-client-secret",
    },
  },
});
