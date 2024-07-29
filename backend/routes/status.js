const express = require('express');
const Status = require('../models/Status');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//Route 1: Get all the status using: GET "/api/status/fetchstatus".Login required
router.get("/fetchstatus",fetchuser,async(req,res)=>{
    try{
        const status = await Status.find({user:req.user.id});
        res.json(status);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route 2: Add a new Status using: POST "/api/status/addstatus". Login required
router.post(
    "/addstatus", fetchuser,[
        body("title","ENter a title please").isLength({min:3}),
    ],async(req, res)=>{
try {
    const{title, description,pic, tag} = req.body;

   //If there are errors, return bad request and the errors

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const status = new Status({
        title,
        description,
        pic,
        tag,
        user:req.user.id,
      });
      const savedStatus = await status.save();
      res.json(savedStatus);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
    }
)

//Route 3: Update a existing Status using: PUT "/api/status/updatestatus". Login required
router.put("/updatestatus/:id",fetchuser,async(req,res)=>{
    const{title,description,pic,tag} = req.body;

    try{
        //create a newStatus object
        const newStatus={};
        if(title){newStatus.title = title};
        if(description){newStatus.description = description};
        if(pic){newStatus.pic= pic};
        if(tag){newStatus.tag = tag}; 


        //Find the status to be update and update it
        let status = await Status.findById(req.params.id);
        if(!status){return res.status(400).send("Not found")}

        if(status.user.toString()!== req.user.id){
            return res.status(401).send("not Allowed");
        }

        status = await Status.findByIdAndUpdate(req.params.id,{$set:newStatus}, {new:true})
        res.json({status});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");  
    }
})


//Route 4: Delete a existing Status using: DELETE "/api/status/deletestatus". Login required
router.delete("/deletestatus/:id",fetchuser,async(req,res)=>{
    const{title,description,pic,tag} = req.body;

    try{
       
        //Find the status to be deleted and delete it
        let status = await Status.findById(req.params.id);
        if(!status){return res.status(400).send("Not found")}

        if(status.user.toString()!== req.user.id){
            return res.status(401).send("not Allowed");
        }

        status = await Status.findByIdAndDelete(req.params.id)
        res.json({"Success": "Status has been deleted"});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");  
    }
})


module.exports = router;