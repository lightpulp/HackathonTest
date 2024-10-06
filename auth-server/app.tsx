import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { LowdbSync } from 'lowdb';

// Define the User interface
interface User {
  id: number;
  email: string;
  password: string;
}

// Create a LowDB adapter
const adapter = new FileSync<{ users: User[] }>('./database.json');
const db: LowdbSync<{ users: User[] }> = low(adapter);

// Set up initial data if not present
db.defaults({ users: [] }).write();

const app = express();
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register endpoint
app.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = db.get('users').find({ email }).value();
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser: User = {
    id: Date.now(),
    email,
    password: hashedPassword,
  };

  // Save user to the database
  db.get('users').push(newUser).write();

  res.status(201).json({ message: 'User registered successfully' });
});

// Log in endpoint
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = db.get('users').find({ email }).value();

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });

  res.status(200).json({ token });
});

// Authentication route
app.post('/auth', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = db.get('users').find({ email }).value();

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({ message: 'Invalid password' });
      } else {
        const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'success', token });
      }
    });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      db.get('users').push({ email, password: hash }).write();
      const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'success', token });
    });
  }
});

// Verify JWT route
app.post('/verify', (req: Request, res: Response) => {
  const token = req.headers['jwt-token'] as string;
  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      res.status(200).json({ status: 'logged in', message: 'success' });
    } else {
      res.status(401).json({ status: 'invalid auth', message: 'error' });
    }
  } catch (error) {
    res.status(401).json({ status: 'invalid auth', message: 'error' });
  }
});

// Check account existence route
app.post('/check-account', (req: Request, res: Response) => {
  const { email } = req.body;

  const user = db.get('users').find({ email }).value();

  res.status(200).json({
    status: user ? 'User exists' : 'User does not exist',
    userExists: !!user,
  });
});

// Set up the Express server
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
