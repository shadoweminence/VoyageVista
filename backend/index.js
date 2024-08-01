const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');  // Import the cors package

connectToMongo();

const app = express();
const port = 5001;

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tourpack', require('./routes/tourpack'));

app.listen(port, () => {
    console.log(`Voyage Vista backend listening at http://localhost:${port}`);
});
