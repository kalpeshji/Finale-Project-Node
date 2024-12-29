const nodemailer = require("nodemailer");
const RegisterModel = require("../Model/Register.Schema");
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "guptakalpeshji@gmail.com",
    pass: "npej tvmc nift tebk",
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email, otp) => {
  try {
    const mailOptions = {
      from: "guptakalpeshji@gmail.com",
      to: email,
      subject: "Your OTP for registration",
      text: `Your OTP for registration is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

const GetRegister = async (req, res) => {
  res.render("Pages/Register");
};

// const PostRegister = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const otp = generateOTP();
//         await sendOTP(email, otp);

//         req.session.otp = otp;

//         res.status(200).send("OTP sent successfully, please check your email");
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         res.status(500).send("Failed to send OTP");
//     }
// };

// const VerifyOTPAndRegister = async (req, res) => {
//     try {
//         const { username, email, password, otp } = req.body;
//         const storedOTP = req.session.otp;

//         if (otp === storedOTP) {
//             const user = new RegisterModel({ username, email, password });
//             const result = await user.save();
//             console.log("User Registered Successfully:", result);
//             res.redirect('/login');
//             res.status(200).send("User registered successfully");
//         } else {
//             res.status(400).send("Incorrect OTP");
//         }
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).send("User Already Exists..");
//     }
// };
const PostRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    await sendOTP(email, otp);

    req.session.otp = otp;

    res.status(200).send("OTP sent successfully, please check your email");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Failed to send OTP");
  }
};

const VerifyOTPAndRegister = async (req, res) => {
  try {
    const { username, email, password, otp } = req.body;

    // Validate inputs
    if (!username || !email || !password || !otp) {
      return res.status(400).send("All fields are required");
    }

    const storedOTP = req.session.otp;

    // Check OTP
    if (otp !== storedOTP) {
      return res.status(400).send("Incorrect OTP or session expired");
    }

    // Clear OTP from session
    delete req.session.otp;

    // Check if user already exists
    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create and save new user
    const newUser = new RegisterModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    console.log("User Registered Successfully:", newUser);

    // Redirect to login
    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Failed to register user");
  }
};

module.exports = { GetRegister, PostRegister, VerifyOTPAndRegister };

// module.exports = { GetRegister, PostRegister, VerifyOTPAndRegister };

// const nodemailer = require('nodemailer');
// const bcryptjs = require('bcryptjs');
// const RegisterModel = require("../Model/Register.Schema");

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'guptakalpeshji@gmail.com',
//         pass: 'npej tvmc nift tebk'
//     }
// });

// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const sendOTP = async (email, otp) => {
//     try {
//         const mailOptions = {
//             from: 'guptakalpeshji@gmail.com',
//             to: email,
//             subject: 'Your OTP for registration',
//             text: `Your OTP for registration is: ${otp}`
//         };
//         await transporter.sendMail(mailOptions);
//         console.log('OTP sent successfully to', email);
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         throw new Error('Failed to send OTP');
//     }
// };

// const GetRegister = async (req, res) => {
//     res.render('Pages/Register');
// };

// const PostRegister = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!password) {
//             return res.status(400).send("Password is required");
//         }
//         const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password
//         const otp = generateOTP();
//         await sendOTP(email, otp);
//         req.session.otp = otp;
//         const newUser = new RegisterModel({ username, email, password: hashedPassword }); // Save hashed password
//         await newUser.save();
//         res.status(200).send("OTP sent successfully, please check your email");
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).send("Failed to register user");
//     }
// };

// const VerifyOTPAndRegister = async (req, res) => {
//     try {
//         const { username, email, password, otp } = req.body;
//         const storedOTP = req.session.otp;

//         if (otp === storedOTP) {
//             const user = await RegisterModel.findOne({ email });
//             if (!user) {
//                 const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password
//                 const newUser = new RegisterModel({ username, email, password: hashedPassword }); // Save hashed password
//                 await newUser.save();
//                 console.log("User Registered Successfully:", newUser);
//             }
//             res.redirect('/login');
//         } else {
//             res.status(400).send("Incorrect OTP");
//         }
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).send("Failed to register user");
//     }
// };

// module.exports = { GetRegister, PostRegister, VerifyOTPAndRegister };
