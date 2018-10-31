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
    
// })

// router.post('/EditProfile', (req, res) =>{
    
// })

module.exports = router;