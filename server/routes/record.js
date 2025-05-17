import express from "express";

//This will help connect to the database
import db from "../db/connection.js";

//Db Collection
const dbCollection = "PlayerData";
//old collection is "records"

//This help convert the id from string to ObjectID for the _id
import { ObjectId } from "mongodb";

/*
Router is an instance of the express router
We use it to define our routes
The router will be added as a middleware and will take control of the requests starting with the path /record
*/
const router = express.Router();

//This section will help get a list of all the records
router.get("/", async (req, res) => {
  let collection = await db.collection(dbCollection);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
  console.log("results");
});

//This is to get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection(dbCollection);
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

//This section creates a new record
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection(dbCollection);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding record");
  }
});

//This section is to update a record
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection(dbCollection);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating record");
  }
});

//This section is to delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection(dbCollection);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
