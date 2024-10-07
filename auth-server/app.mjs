import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import FileSync from 'lowdb/adapters/FileSync';
import low from 'lowdb';

// Initialize Express app
const app = express();

// Use FileSync adapter for synchronous file operations
const adapter = new FileSync('./database.json');
const db = low(adapter);

// Initialize the database with a default structure
db.defaults({ users: [] }).write(); // Ensure there's a users array

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg';

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic home route for the API
app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication');
});

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    // Look up the user entry in the database
    const user = db.get('users').find({ email }).value(); // Use find to locate the user

    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user) {
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const loginData = { email, signInTime: Date.now() };
            const token = jwt.sign(loginData, jwtSecretKey);
            return res.status(200).json({ message: 'success', token });
        });
    } else {
        // If no user is found, hash the given password and create a new entry in the auth db
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }
            db.get('users').push({ email, password: hash }).write(); // Add new user
            const loginData = { email, signInTime: Date.now() };
            const token = jwt.sign(loginData, jwtSecretKey);
            return res.status(200).json({ message: 'success', token });
        });
    }
});

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token';
    const authToken = req.headers[tokenHeaderKey];

    try {
        const verified = jwt.verify(authToken, jwtSecretKey);
        if (verified) {
            return res.status(200).json({ status: 'logged in', message: 'success' });
        } else {
            return res.status(401).json({ status: 'invalid auth', message: 'error' });
        }
    } catch (error) {
        return res.status(401).json({ status: 'invalid auth', message: 'error' });
    }
});

// An endpoint to see if there's an existing account for a given email address
app.post('/check-account', (req, res) => {
    const { email } = req.body;

    // Look up the user entry in the database
    const user = db.get('users').find({ email }).value();

    res.status(200).json({
        status: user ? 'User exists' : 'User does not exist',
        userExists: !!user,
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
