import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  //Connect the client to the server
  await client.connect();
  //Send ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment.  You successfuly connected to MongoDB!");
} catch (err) {
  console.log("Error connecting to DB! ");
  console.log(err);
}

//Old is let db = client.db("employees")
let db = client.db("Ark");

export default db;
