const express = require('express');

const router = express.Router();

const User = require('../../models/user');

router.post('/SignUp', (req, res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
        username: req.body.username,
        dob: req.body.dob
    });

    user.save().then( savedUser => res.json({ savedUser }))
})


// router.post('/Login', (req, res) =>{
//     // TODO Add new token to response;
//     User.find({name: req.body.name , password: req.body.password}).then( user => res.json({ user })).catch( err => res.json({ message: "user does not exist"}))
// })

// router.post('/EditProfile', (req, res) =>{
//     User.find({name: req.body.name , password: req.body.password}).then( user => {
//         // Update User Info then return user with new Token
//     }).catch( err => res.json({ message: "user does not exist"}))    
// })

module.exports = router;