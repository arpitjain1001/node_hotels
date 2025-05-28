const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');
const {authMiddleware, generateToken} = require('./../jwt');


router.post('/signup', async (req, res) =>{
  try{
      const data = req.body // Assuming the request body contains the person data
      const newPerson= new Person(data);
      // Save the new person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);

      const payload = {
          id: response.id,
          username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is : ", token);

      res.status(200).json({response: response, token: token});
  }
  catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})

// / Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', authMiddleware, async (req, res) => {
  try{
    
      console.log("User ID:", req.userId);

      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Profile route




// GET API to fetch all persons
router.get("/",async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
      const person = new Person(req.body);
      await person.save();
      res.status(201).json({ message: "Person registered successfully", person });
  } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
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
});+

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





