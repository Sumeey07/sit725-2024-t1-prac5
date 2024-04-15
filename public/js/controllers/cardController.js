const getProjects = (collection, req, res) => {
  collection.find().toArray()
    .then(data => {
      res.json({ statusCode: 200, data: data, message: "Success" });
    })
    .catch(err => {
      console.error("Error retrieving data:", err);
      res.status(500).json({ statusCode: 500, message: "Internal server error" });
    });
};

module.exports = {
  getProjects
};