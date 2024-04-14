const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;


const cors = require('cors');


/*app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow requests from this origin
  //optionsSuccessStatus: 200 // Some legacy browsers (IE11) may not recognize 204
}));*/

app.use(cors());

// Create MySQL connection pool
const pool = mysql.createPool({
    //host: "localhost",
    host: "database",
    user: "root",
    password: "",
    database: "registration_db",
    connectionLimit: 10
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Handle POST request to '/register'
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Insert user data into database
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    pool.query(query, [username, email, password], (error, results) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Registration failed at server side. Please try again.');
        } else {
            res.status(201).send('User registered successfully.');
        }
    });
});



// Handle POST request to '/login'
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("databse hitted")
    // Query the database to check if the user exists with the provided credentials
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    pool.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Error:', error);
            console.log(error);
            res.status(500).send('Login failed. Please try again.');
        } else {
            if (results.length > 0) {
                // User found, login successful
                const userEmail = results[0].email; // Retrieve user's email from the query results
                res.status(200).send(userEmail); // Send the user's email back to the frontend
            } else {
                // User not found or invalid credentials
                res.status(401).send('Invalid email or password.');
            }
        }
    });
});

//saving the details
app.post('/saveRecipe', (req, res) => {
    console.log(req.body.userEmail)
    const { userEmail, recipeName } = req.body;
    console.log("it entered save function");
    // Insert recipe name into database under user's email
    const query = `INSERT INTO saved_recipes (user_email, recipe_name) VALUES (?, ?)`;
    pool.query(query, [userEmail, recipeName], (error, results) => {
        if (error) {
            console.error('Error saving recipe:', error);
            res.status(500).send('Failed to save recipe. Please try again.');
        } else {
            res.status(200).send('Recipe saved successfully.');
        }
    });
});

app.post('/records', (req, res) => {
    const { userEmail } = req.body;
    console.log("Entered records function for user:", userEmail);

    // Query to retrieve recipe names based on user's email
    const query = `SELECT recipe_name FROM saved_recipes WHERE user_email = ?`;
    pool.query(query, [userEmail], (error, results) => {
        if (error) {
            console.error('Error retrieving records:', error);
            res.status(500).send('Failed to retrieve records. Please try again.');
        } else {
            const recipes = results.map(result => result.recipe_name);
            res.status(200).json(recipes);
        }
    });
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
