//const bodyParser = require('body-parser');
const express = require('express');
const User=require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const router = express.Router();
// const secretKey = 'wts-secret-key'; 
const secretKey =process.env.SECRET_KEY; 

// function getUserFromDatabase(username) {
//     // Replace this with your database query to fetch the user by username
//     // For this example, we'll use a synchronous function to simulate the database query
//     return User.find((user) => user.userName === username);
//   }

async function getUserFromDatabase(username) {
    try {
      const user = await User.findOne({ username }); // Assuming 'username' is a unique identifier
      return user;
    } catch (error) {
      throw new Error('User not found.');
    }
  }

  router.post('/',async (req,res)=>{
    const { userName, password } = req.body;
   
    try {
      console.log("username and password---->",userName,password)

        const user = await User.findOne({ userName });
     if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
          };

          const passwordMatches = await bcrypt.compare(password, user.password);

          console.log("password",passwordMatches)

          if (!passwordMatches) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
          }

          const payload = { userId: user._id, username: user.userName,userType:user.userType}
          // , { expiresIn: '1h' }
          const token = jwt.sign(payload, secretKey);
          res.json({ success: true, message: 'Login successful.', token });
       
       // res.status(201).json({ message: 'here is your user', user: user })

        
    } catch (err) {
        console.error("dont found user",err)
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

  })

 

  module.exports = router;
