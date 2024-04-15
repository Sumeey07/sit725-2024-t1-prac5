var express = require("express")
var { MongoClient } = require("mongodb");
var clickController = require("./public/js/controllers/clickController");
var formController = require("./public/js/controllers/formController");
var cardController = require("./public/js/controllers/cardController");
var path = require("path");

var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var uri = "mongodb://localhost:27017";
var client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db("AppliedSoftwareEngineering");
    const collection = db.collection("Task5.2C");

    app.post('/api/projects/insert', formController.submitForm.bind(null, collection));
    app.get('/api/projects', cardController.getProjects.bind(null, collection));

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "view.html"));
    });

    // Start the server after MongoDB connection
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("App listening to port: " + port);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });