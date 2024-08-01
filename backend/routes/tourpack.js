const express = require('express');
const Tourpack= require('../models/Tourpack');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//Route 1: Get all the status using: GET "/api/status/fetchstatus".No Login required
router.get("/fetchpackage",async(req,res)=>{
    try{
        const tourpack = await Tourpack.find();
        res.json(tourpack);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route 2: Add a new Status using: POST "/api/status/addstatus". Login required
router.post(
    "/addpackage", fetchuser,[
        body("title","ENter a title please").isLength({min:3}),
    ],async(req, res)=>{
try {
    const{title, description, tag} = req.body;

   //If there are errors, return bad request and the errors

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tourpack = new Tourpack({
        title,
        description,
        tag,
        user:req.user.id,
      });
      const savedTourpack = await tourpack.save();
      res.json(savedTourpack);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
    }
)

//Route 3: Update a existing Status using: PUT "/api/status/updatestatus". Login required
router.put("/updatepackage/:id",fetchuser,async(req,res)=>{
    const{title,description,tag} = req.body;

    try{
        //create a newStatus object
        const newTourpack={};
        if(title){newTourpack.title = title};
        if(description){newTourpack.description = description};
        if(tag){newTourpack.tag = tag}; 


        //Find the status to be update and update it
        let tourpack = await Tourpack.findById(req.params.id);
        if(!tourpack){return res.status(400).send("Not found")}

        if(tourpack.user.toString()!== req.user.id){
            return res.status(401).send("not Allowed");
        }

        tourpack = await Tourpack.findByIdAndUpdate(req.params.id,{$set:newTourpack}, {new:true})
        res.json({tourpack});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");  
    }
})


//Route 4: Delete a existing Status using: DELETE "/api/status/deletestatus". Login required
router.delete("/deletepackage/:id",fetchuser,async(req,res)=>{
    const{title,description,tag} = req.body;

    try{
       
        //Find the status to be deleted and delete it
        let tourpack = await Tourpack.findById(req.params.id);
        if(!tourpack){return res.status(400).send("Not found")}

        if(tourpack.user.toString()!== req.user.id){
            return res.status(401).send("not Allowed");
        }

        tourpack = await Tourpack.findByIdAndDelete(req.params.id)
        res.json({"Success": "Package has been deleted"});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");  
    }
})


module.exports = router;