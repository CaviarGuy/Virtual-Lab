const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); 
const cors = require('cors'); // Import CORS

const app = express();
app.use(bodyParser.json()); 
app.use(cors()); // Enable CORS for frontend-backend communication

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'Harsh123#@', 
  database: 'jyoti' 
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// POST route to handle login
app.post('/login', (req, res) => {
  const { userid, username, password } = req.body;

  if (!userid || !username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const query = 'SELECT * FROM user WHERE userid = ? AND username = ? AND password = ?';
  connection.query(query, [userid, username, password], (err, results) => {
    if (err) {
      console.error('Query Error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
