const submitForm = (collection, req, res) => {
  const formData = req.body;
  collection.insertOne(formData)
    .then(result => {
      res.json({ statusCode: 200, data: result.ops, message: "Data inserted successfully" });
    })
    .catch(err => {
      console.error("Error inserting data:", err);
      res.status(500).json({ statusCode: 500, message: "Internal server error" });
    });
};

module.exports = {
  submitForm
};