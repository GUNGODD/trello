import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import clientPromise from "@/lib/mongoClient";

export async function GET(req: NextRequest) {
  const results: any = {
    env: {
      has_mongodb_uri: !!process.env.MONGODB_URI,
      has_nextauth_url: !!process.env.NEXTAUTH_URL,
      nextauth_url: process.env.NEXTAUTH_URL || null,
      node_env: process.env.NODE_ENV,
    },
    mongoose: null,
    mongoClient: null,
  };

  // Test Mongoose connection
  try {
    const start = Date.now();
    await dbConnect();
    results.mongoose = {
      status: "success",
      duration_ms: Date.now() - start,
    };
  } catch (err: any) {
    results.mongoose = {
      status: "error",
      message: err.message,
      stack: err.stack,
    };
  }

  // Test MongoClient connection
  try {
    const start = Date.now();
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();
    results.mongoClient = {
      status: "success",
      duration_ms: Date.now() - start,
      collections: collections.map((c) => c.name),
    };
  } catch (err: any) {
    results.mongoClient = {
      status: "error",
      message: err.message,
      stack: err.stack,
    };
  }

  return Response.json(results);
}
