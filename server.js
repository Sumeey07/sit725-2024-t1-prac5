var express = require("express")
var { MongoClient } = require("mongodb");

var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var uri = "mongodb://localhost:27017";
var client = new MongoClient(uri);

const cardList = [
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2"
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3"
  }
]

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    var db = client.db("AppliedSoftwareEngineering");
    var collection = db.collection("Task4.2P");

    app.post('/api/projects/insert', async (req, res) => {
      try {
        const formData = req.body;
        const result = await collection.insertOne(formData);
        res.json({ statusCode: 200, data: result.ops, message: "Data inserted successfully" });
      } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ statusCode: 500, message: "Internal server error" });
      }
    });

    app.get('/api/projects', async (req, res) => {
      try {
        const data = await collection.find().toArray();
        res.json({ statusCode: 200, data: data, message: "Success" });
      } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).json({ statusCode: 500, message: "Internal server error" });
      }
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port)
})