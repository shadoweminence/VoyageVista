const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const ADMIN_EMAIL = "admin123@gmail.com";

const JWT_SECRET = "abce";

//Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
    body("confirmPassword", "Confirm Password is required").exists(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //check whether a user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Assign a role
      const role = req.body.email === ADMIN_EMAIL ? "admin" : "user";

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        role,
      });

      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route2 : Authenticate a user using: Post "api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 8 characters").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      success = false;
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please enter correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Get logged in User details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 4: Update user details using : PUT
router.put("/updateuserdetails/:id", fetchuser, async (req, res) => {
  let success = false;
  const { name, email, oldPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    let userDetails = await User.findById(req.params.id);
    if (!userDetails) {
      return res.status(400).json({ success, error: "User not found" });
    }

    // Check if old password is provided
    if (oldPassword) {
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      );
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct old password." });
      }
    }

    // Create a newUserDetails object
    const newUserDetails = {};
    if (name) {
      newUserDetails.name = name;

      // Generate trigrams for the updated name
      const generateTrigrams = (str) => {
        const processedStr = str.toLowerCase();
        const trigrams = [];
        for (let i = 0; i < processedStr.length - 2; i++) {
          trigrams.push(processedStr.slice(i, i + 3));
        }
        return trigrams;
      };

      // Add trigrams to the user details
      newUserDetails.trigrams = generateTrigrams(name);
    }
    if (email) {
      newUserDetails.email = email;
    }
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      newUserDetails.password = await bcrypt.hash(newPassword, salt);
    }

    // Update the user details, including the trigrams if the name is updated
    userDetails = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUserDetails },
      { new: true }
    );
    success = true;
    res.json({ success, userDetails });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
