const mongoose = require("mongoose");

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true, lowercase: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
