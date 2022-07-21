const { ObjectID } = require("bson");
const express = require("express");
const db = require("./db");
const { connectToDb, getDb } = require("./db");

// init app & middleware

const app = express();

app.use(express.json())
// Connect to the Db

let dbConnectivity;

connectToDb((err) => {
  // if we don't get err from db connectivity then our port will start
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
    dbConnectivity = getDb();
  }
});

// simple check either node working or not
// app.listen(3000, () => {
//     console.log('app listening on port 3000')
// })

//route

app.get("/books", (req, res) => {
  let bookss = [];
  console.log(dbConnectivity, "dbConnectivity");
  dbConnectivity
    .collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((element) => {
      bookss.push(element);
    })
    .then(() => {
      res.status(200).json(bookss);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the data" });
    });
  // res.json({msg:"Wee;cpme"})
});

app.get("/books/:id", (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    console.log
    (req.params.id)
    dbConnectivity
      .collection("books")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch(() => {
        res.status(500).json({ error: "Could not fetch the data" });
    });
  }
  else{
    req.status(500).json({error:"id is not correct"})
  }
});


app.post("/books", (req, res) => {
    const body = req.body
      dbConnectivity
        .collection("books")
        .insert(body)
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch(() => {
          res.status(500).json({ error: "Could not fetch the data" });
      });
  });


  app.delete("/books/:id", (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
      dbConnectivity
        .collection("books")
        .deleteOne({ _id: ObjectID(req.params.id) })
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch(() => {
          res.status(500).json({ error: "Could not delete the data" });
      });
    }
    else{
      req.status(500).json({error:"id is not correct"})
    }
  });