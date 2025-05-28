// import express from 'express'
const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const passport = require('./auth');
const Person = require('./models/Person')


const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// middleware/logger.js
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
}
app.use(logRequest);//this line tells Express to use the middleware for all routes

passport.use(passport.initialize());
// const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', passport.authenticate('local', {session: false}), function(req, res) {
  res.send('Welcome to the hotel')
})

//Import the router files
const person_routes = require('./routes/personRoutes');
const menuItems_routes = require('./routes/menuItemsRoutes');

//Use the router
app.use('/person',person_routes);
app.use('/menuItem',menuItems_routes);

 
app.listen(PORT , () => {
    console.log('listening on app 3000')
})

