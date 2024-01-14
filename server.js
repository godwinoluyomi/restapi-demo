const express = require("express");
const mongoose = require("mongoose");
const { generateRandomName, generateRandomAge } = require("./data/randomUtils");

// connection with ATLAS
require("dotenv").config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to Atlas MongoDB");
});

// USer Model
const User = require("./models/User");

// ROUTES
// GET
app.get("/", async (req, res) => {
  try {
    // List all users
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
app.post("/", async (req, res) => {
  //   // Generate random user data
  //   const name = generateRandomName();
  //   const age = generateRandomAge();
  //   const email = `${name.toLowerCase()}${age}@example.com`;

  //   const newUser = new User({ name, age, email });

  const { name, age, email } = req.body;
  const newUser = new User({ name, age, email });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// DELETE
app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
