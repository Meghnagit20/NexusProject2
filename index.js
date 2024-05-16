const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [];


app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Check if user already exists
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser = { username, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Find user by username
  const user = users.find(user => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});