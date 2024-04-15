const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const dbPath = "./registration.db"; // Path to SQLite database file

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Establish SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database");
    createTables(); // Create tables once connected
  }
});

// Create tables if they don't exist
const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS saved_recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_email TEXT NOT NULL,
      recipe_name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
    )
  `);

  console.log("Tables created or already exist.");
};

// Handle GET request to root endpoint
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Handle POST request to '/register'
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    function (err) {
      if (err) {
        console.error("Error registering user:", err.message);
        res
          .status(500)
          .send("Registration failed at server side. Please try again.");
      } else {
        res.status(201).send("User registered successfully.");
      }
    }
  );
});

// Handle POST request to '/login'
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.error("Error:", err.message);
        res.status(500).send("Login failed. Please try again.");
      } else if (row) {
        res.status(200).send(row.email);
      } else {
        res.status(401).send("Invalid email or password.");
      }
    }
  );
});

// Handle POST request to '/saveRecipe'
app.post("/saveRecipe", (req, res) => {
  const { userEmail, recipeName } = req.body;

  db.run(
    "INSERT INTO saved_recipes (user_email, recipe_name) VALUES (?, ?)",
    [userEmail, recipeName],
    function (err) {
      if (err) {
        console.error("Error saving recipe:", err.message);
        res.status(500).send("Failed to save recipe. Please try again.");
      } else {
        res.status(200).send("Recipe saved successfully.");
      }
    }
  );
});

// Handle POST request to '/records'
app.post("/records", (req, res) => {
  const { userEmail } = req.body;

  db.all(
    "SELECT recipe_name FROM saved_recipes WHERE user_email = ?",
    [userEmail],
    (err, rows) => {
      if (err) {
        console.error("Error retrieving records:", err.message);
        res.status(500).send("Failed to retrieve records. Please try again.");
      } else {
        const recipes = rows.map((row) => row.recipe_name);
        res.status(200).json(recipes);
      }
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
