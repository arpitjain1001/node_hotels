// import express from 'express'
const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the hotel.... How can i help you?...')
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

