const express = require('express');
const tokenizer = require('../../middleware/tokenizer');

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

    user.save().then( savedUser => tokenizer.createSignUpToken(savedUser , res));
})

router.post('/CheckUsernameAvailability', (req, res) => {
    User.find({ username: req.body.username})
    .then(resp => {
      return resp.length > 0 ? res.json({ status : "Not Available"}) : res.json({ status : "Available"})
    })
    .catch(err => res.json({ err }) )
})

router.get('/checkLoginStatus' , tokenizer.verifyToken , (req, res) => {
    return res.json({ user : req.user});
})

router.post('/Login', (req, res) =>{
    // TODO Add new token to response;
    User.find({email: req.body.email , password: req.body.password}).then( resp => {
         if(resp.length < 1){
            User.find({username: req.body.email , password: req.body.password}).then( resp => {
            return resp.length > 0 ? tokenizer.createLoginToken(resp[0], res) : res.json({ validUser: false})
            })
         } 
        else{
            return tokenizer.createLoginToken(resp[0], res);
            }
    
    }).catch( err => console.log(err))
})

// router.post('/EditProfile', (req, res) =>{
//     User.find({name: req.body.name , password: req.body.password}).then( user => {
//         // Update User Info then return user with new Token
//     }).catch( err => res.json({ message: "user does not exist"}))    
// })

module.exports = router;