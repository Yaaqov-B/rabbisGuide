import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
  console.log("Successfully connected to MongoDB Atlas");

} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training4");

export default db;