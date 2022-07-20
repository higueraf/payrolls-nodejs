require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create Express Server
const app = express();

// CORS Configurations
app.use(cors());

// Read and parse body
app.use(express.json());

// Database Connection
dbConnection();

// Public Directory
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/payrolls', require('./routes/payrolls'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/all', require('./routes/searchs'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/contracts', require('./routes/contracts'));


app.get('*', (req, res) => {
    res.status(200).json({ message: 'Server running' })
});


app.listen(process.env.PORT, () => {
    console.log('Listening ' + process.env.PORT);
});

