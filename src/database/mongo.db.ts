import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import { MongoAdapter } from "@builderbot/database-mongo";

dotenv.config();

let db: Db | null = null;

export const connectToMongoDB = async (): Promise<Db> => {
  if (db) return db;

  const uri = process.env.MONGODB_URI || "";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ MongoDB connection established");

    db = client.db(process.env.MONGODB_NAME);
    return db;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export const adapterDB = new MongoAdapter({
  dbUri: process.env.MONGODB_URI || "",
  dbName: process.env.MONGODB_NAME || "",
});
