// const router = require("express").Router();
// const User = require("../models/Users");
// const bcrypt = require("bcryptjs");

// // User registration
// router.post("/register", async (req, res) => {
//   try {
//     const { email, username, password } = req.body;

//     // Check if any input field is empty
//     if (!email || !username || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if email already exists
//     const isEmailExist = await User.findOne({ email });
//     if (isEmailExist) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash password with salt
//     const salt = bcrypt.genSaltSync(10);
//     const hashPassword = bcrypt.hashSync(password, salt);

//     // Create new user
//     const user = new User({ email, username, password: hashPassword });
//     await user.save();
//     return res.status(200).json({ message: "Sign up successfully" });

//   } catch (error) {
//     console.error('Error during user registration:', error.message);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });

// // Log in
// router.post('/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if any input field is empty
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Please sign up first' });
//     }

//     const isPasswordCorrect = bcrypt.compareSync(
//       password,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: 'Password is not correct' });
//     }

//     // Send user data without password
//     const { password: userPassword, ...others } = user._doc;
//     return res.status(200).json({ user: others });

//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

// Function to handle sending error responses
const sendErrorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ message });
};

// User registration
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if any input field is empty
    if (!email || !username || !password) {
      return sendErrorResponse(res, "All fields are required", 400);
    }

    // Check if email already exists
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return sendErrorResponse(res, "Email already exists", 400);
    }

    // Hash password with salt
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const user = new User({ email, username, password: hashPassword });
    await user.save();
    return res.status(200).json({ message: "Sign up successfully" });

  } catch (error) {
    console.error('Error during user registration:', error.message);
    return sendErrorResponse(res, "Internal Server Error", 500);
  }
});

// Log in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if any input field is empty
    if (!email || !password) {
      return sendErrorResponse(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 'Please sign up first', 400);
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return sendErrorResponse(res, 'Password is not correct', 400);
    }

    // Send user data without password
    const { password: userPassword, ...others } = user._doc;
    return res.status(200).json({ user: others, message: "Login successful" });

  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 'Internal server error', 500);
  }
});

module.exports = router;
