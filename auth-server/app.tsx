// Import necessary modules
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Define the User interface
interface User {
  email: string;
  password: string;
}

// Set up the LowDB adapter and database
const adapter = new FileSync('./database.json');
const db = low(adapter);

// Initialize Express app
const app = express();

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'; // Ideally, store this in an environment variable

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the database with an empty user array if it doesn't exist
db.defaults({ users: [] }).write();

// Basic home route for the API
app.get('/', (_req: Request, res: Response) => {
  res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication');
});

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // Look up the user entry in the database
  const user = db.get('users').filter((user: User) => email === user.email).value();

  // If found, compare the hashed passwords and generate the JWT token for the user
  if (user.length === 1) {
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Invalid password' });
      } else {
        const loginData = {
          email,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: 'success', token });
      }
    });
  } 
  // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
  else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user' });
      }

      console.log({ email, password: hash });
      db.get('users').push({ email, password: hash }).write();

      const loginData = {
        email,
        signInTime: Date.now(),
      };

      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: 'success', token });
    });
  }
});

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req: Request, res: Response) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[tokenHeaderKey] as string;

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
app.post('/check-account', (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  console.log(req.body);

  const user = db.get('users').filter((user: User) => email === user.email).value();

  console.log(user);

  res.status(200).json({
    status: user.length === 1 ? 'User exists' : 'User does not exist',
    userExists: user.length === 1,
  });
});

// Start the server
const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
