const express = require("express");
const mongoose = require("mongoose");

require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(express.json());
require("./routes/index.js")(app);

const PORT = 3000
app.listen(PORT, () => {
  console.log("Listening on port 3000!");
});
