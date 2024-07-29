const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = "abce";

//Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
   body('name','Enter a valid Name').isLength({min: 3}),
   body('email', 'Enter a valid email').isEmail(),
   body('password','Password must be at least 5 characters').isLength({min: 5}),
],async (req, res) =>{
   //If there are errors, return bad request and the errors

   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()}) ;
  }


try{
  //check whether a user with this email exists already
  let user =await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({error: "Sorry a user with this email already exists"})
  }

const salt =await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  }) ;
 
  const data ={
    user:{
      id: user.id
    }
  }
  const authtoken =jwt.sign(data, JWT_SECRET);


 
 res.json({authtoken})
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})

//Route2 : Authenticate a user using: Post "api/auth/login". No login required

router.post('/login',[
 
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be at least 8 characters').exists(),
],async(req,res)=>{
   //If there are errors, return bad request and the errors
   const errors = validationResult(req);
   if(!errors.isEmpty){
       return res.status(400).json({errors:errors.array()});
   }
   const {email, password} = req.body;
   try{
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Please enter correct credentials."});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        return res.status(400).json({error: "Please enter correct credentials."})
    }

    const data ={
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
   }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
   }

})

//Route 3: Get logged in User details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req, res) =>{
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.error(error.message);
        res.status(500).send("Internal server error");
    }
    })

module.exports = router;