const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ["Starter", "Main Course", "Dessert", "Beverage", "Other"],
    default: "Other"
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: ""
  }
 
});

const Menu= mongoose.model("MenuItem", menuItemSchema);

module.exports = Menu;