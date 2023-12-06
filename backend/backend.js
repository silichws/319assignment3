var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);
const collection = "fakestore_catalog";

app.get("/list", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection(collection)
    .find(query)
    .sort()
    .toArray();
  // console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/get/:id", async (req, res) => {
  const find = Number(req.params.id);
  console.log(find);
  const query = {id: find};
  const results = await db
    .collection(collection)
    .find(query)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);

});

app.post("/add", async (req, res) => {
  await client.connect();
  var key = Object.keys(req.body);
  var values = Object.values(req.body);
  console.log(values);

  const id = values[0];
  const title = values[1];
  const price = values[2];
  const description = values[3];
  const category = values[4];
  const image = values[5];
  const rate = values[6];
  const count = values[7];

  const newDoc = {
    id: id,
    title,
    title,
    price,
    description,
    category,
    image,
    rating: {
      rate: rate,
      count: count
    },
  };
  const results = await db.collection(collection).insertOne(newDoc);
  res.status(200);
  res.send(results);
});

app.put("/update", async (req, res) => {
  console.log("updating");
  await client.connect();
  let query =  {id: req.body["id"]};
  if (!query)
  {
    res.status(500);
    res.send("Not found");
    return;
  }
  const results_delete = await db.collection(collection).deleteOne(query);

  console.log(results_delete);

  var key = Object.keys(req.body);
  var values = Object.values(req.body);
  console.log(values);

  const id = values[0];
  const title = values[1];
  const price = values[2];
  const description = values[3];
  const category = values[4];
  const image = values[5];
  const rate = values[6];
  const count = values[7];

  const newDoc = {
    id: id,
    title,
    title,
    price,
    description,
    category,
    image,
    rating: {
      rate: rate,
      count: count
    },
  };
  const results = await db.collection(collection).insertOne(newDoc);
  res.status(200);
  res.send(results);
});


app.delete("/delete", async (req, res) => {
  await client.connect();
  console.log(req.body["id"]);
  let query =  {id: req.body["id"]};
  const results = await db.collection(collection).deleteOne(query);
  // let results = "none";
  res.status(200);
  res.send(results);
});
