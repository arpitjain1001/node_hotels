const express = require("express");
const router = express.Router();
const MenuItem  = require('./../models/MenuItem');



router.post("/", async(req, res) =>{
    try {
        const data = req.body;
        const newPerson = new MenuItem(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server.Error'});
      }
  });
  
  // GET API to fetch all persons
  router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server.Error: " });
  }
  });
  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
      const result = await MenuItem.find({  category: workType });  //bss iss jagah category aa jaega baaki sb same h 
      if (result.length === 0) {
        return res.status(404).json({ message: "No menuitem was found with this work type" });
      }
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE: Delete person by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMenuitem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuitem) {
      return res.status(404).json({ message: "Menuitem was not found" });
    }
    res.status(200).json({ message: "Menuitem deleted successfully", data: deletedMenuitem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  module.exports =router
  
  