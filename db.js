const mongoose = require('mongoose')
const mongoURL ='mongodb://127.0.0.1:27017/hotels'     //database name is hotels

//set up MongoDB connection  
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true 
})

const db = mongoose.connection;
// db.on('connected',() => {
//     console.log('connected to mongodb');
// })

db.on('error',(err) => {
    console.log('mongodb connection error',err);
})

db.on('disconnected',() => {
    console.log('mongodb disconnnected');
})

module.exports = db;


