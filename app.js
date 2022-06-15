const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(express.json());
app.use("/users", users);
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({"error": err.message})
})

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
