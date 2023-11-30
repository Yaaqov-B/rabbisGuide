import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

function getRabbi(req) {
  return {
    name: req.body.name,
    alias: req.body.alias,
    born: req.body.born,
    died: req.body.died,
    birthPlace: req.body.birthPlace,
    deathPlace: req.body.deathPlace,
    description: req.body.description,
    externalLinks: req.body.externalLinks,
    books: req.body.books,
    teachers: req.body.teachers,
    students: req.body.students,
  }
}
// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});// This section will help you get a list of all the records.

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let collection = await db.collection("records");
  let rabbi = getRabbi(req);

  let result = await collection.insertOne(rabbi);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let rabbi = getRabbi(req);
  const updates =  {
    $set: rabbi
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("records");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;