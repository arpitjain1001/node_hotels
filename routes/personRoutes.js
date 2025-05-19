const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');



router.post("/", async(req, res) =>{
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
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
    const data = await Person.find();
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
    const result = await Person.find({ work: workType });
    if (result.length === 0) {
      return res.status(404).json({ message: "No person found with this work type" });
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json({ message: "Person updated", data: updatedPerson });
  } catch (err) {
    res.status(400).json({ error:'internal server error'});
  }
});

//Delete
// DELETE: Delete person by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted successfully", data: deletedPerson });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;