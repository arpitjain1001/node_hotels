require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL; // ✅ Define mongoURL

if (!mongoURL) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const db = mongoose.connection;
db.on('connected',() => {
    console.log('connected to mongodb');
})

db.on('error',(err) => {
    console.log('mongodb connection error',err);
})

db.on('disconnected',() => {
    console.log('mongodb disconnnected');
})

module.exports = db;


