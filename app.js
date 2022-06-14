const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




const app = express();
app.use(express.json());
require("./routes/index.js")(app); 


app.use('/users/:id', async function (req, res, next) {
  console.log("STATE:" . mongoose.connection.readyState);
  const test = await User.findById("62a8b13491c82dbaf3d347b5");
  console.log(test)
  next();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening on port 3000!");
});
