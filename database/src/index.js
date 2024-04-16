import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./util/logger.js";
import pool from "./config/mysql.config.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Create tables if they don't exist
const createTables = () => {
  pool.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (error, results, fields) => {
      if (error) console.error("Error creating users table:", error);
      else console.log("Users table created or already exists.");
    }
  );

  pool.query(
    `
    CREATE TABLE IF NOT EXISTS saved_recipes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_email varchar(255) NOT NULL,
      recipe_name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (error, results, fields) => {
      if (error) console.error("Error creating saved_recipes table:", error);
      else console.log("Saved recipes table created or already exists.");
    }
  );
};

app.listen(PORT, () => {
  logger.info(`Server running on: ${ip.address()}:${PORT}`);
  createTables();
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Handle POST request to '/register'
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (error, results, fields) => {
      if (error) {
        console.error("Error registering user:", error);
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

  pool.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, results, fields) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).send("Login failed. Please try again.");
      } else if (results.length > 0) {
        res.status(200).send(results[0].email);
      } else {
        res.status(401).send("Invalid email or password.");
      }
    }
  );
});

// Handle POST request to '/saveRecipe'
app.post("/saveRecipe", (req, res) => {
  const { userEmail, recipeName } = req.body;

  pool.query(
    "INSERT INTO saved_recipes (user_email, recipe_name) VALUES (?, ?)",
    [userEmail, recipeName],
    (error, results, fields) => {
      if (error) {
        console.error("Error saving recipe:", error);
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

  pool.query(
    "SELECT recipe_name FROM saved_recipes WHERE user_email = ?",
    [userEmail],
    (error, results, fields) => {
      if (error) {
        console.error("Error retrieving records:", error);
        res.status(500).send("Failed to retrieve records. Please try again.");
      } else {
        const recipes = results.map((row) => row.recipe_name);
        res.status(200).json(recipes);
      }
    }
  );
});
