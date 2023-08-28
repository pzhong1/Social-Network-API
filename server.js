const express = require('express');//Import the 'express' framework library
const userRoutes = require('./routes/userRoutes');//Import user route
const thoughtRoutes = require('./routes/thoughtRoutes');//Import thought route
const db = require('./config/connection');//Import connection file

const app = express();//allowing to configure and control the server.
const PORT = process.env.PORT || 3001;//set the port number http 3001

app.use(express.json());//JSON object 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);//endpoint 
app.use('/api/thoughts', thoughtRoutes);//endpoint



db.once('open', () => {//Set up an event listener for the database connection. Once the database connection is open.
    app.listen(PORT, () => {// start the server
        console.log(`API server running on port localhost:${PORT}!`);
    });
});
