const express = require('express');
const router= express.Router()
const person=require('./../models/person');
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming req body contains the person data

        // Create a new person document using the mongoose model
        const newPerson = new person(data); // Ensure 'Person' is the correct model name
        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response); // Return the saved document or some relevant data
    } catch (error) {
        console.log(error); // Corrected to use 'error'
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get method to get the person

router.get('/',async(req,res)=>{
    try {
        const data= await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'internal server error'})
        

        
    }
})

router.get('/:workType',async (req,res)=>{
    try {
        //extract work type from URL parameter
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='maneger'||workType=='waiter'){
            const responce = await person.find({work:workType});
            console.log('responce fetched');
            res.status(200).json(responce)
        }else{
            res.status(400).json({error:'Invalid workType'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        // Extract the id from the URL parameter
        const personId = req.params.id;
        // Update data for person
        const updatePersonData = req.body;

        const response = await person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
            
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' }); // Fixed typo: 'js' should be 'json'
        }

        // Send response with updated person data
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
//add comment for testing purpose
module.exports = router;