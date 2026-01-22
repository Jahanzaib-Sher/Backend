const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  provider: { type: String, default: "email" }
});

module.exports = mongoose.model("User", userSchema);
