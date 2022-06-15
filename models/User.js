const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
