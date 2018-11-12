const express = require('express');
const tokenizer = require('../../middleware/tokenizer');

const router = express.Router();

const User = require('../../models/user');
const Notification = require('../../models/notification');

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

router.get('/getUser' , tokenizer.verifyToken , (req, res) => {
    User.findById(req.user._id)
    .then(user => res.json({ user }))
    .catch(err => res.json({success: false}))
})

router.get('/getOtherUser/:username', (req, res) => {
    User.find({username: req.params.username})
    .then(user => {
        let foundUser = user[0];
        foundUser.password = "xxxxxxxxx";
        return res.json({ user: foundUser })
    })
})

router.post('/followUser', tokenizer.verifyToken, (req, res)=>{
    User.findById(req.user._id)
    .then(user => {
        user.followings.push(req.body.username);
        user.save().then(() => {
            User.find({username : req.body.username})
            .then( users => {
                const followedUser = users[0];
                followedUser.followers.push(req.user.username);
                followedUser.save().then(updatedUser => {
                    const notification = new Notification({
                        type: "new_follow",
                        recipientId: followedUser._id,
                        creatorUsername: req.user.username,
                        message: ` followed you`
                    
                    })

                    notification.save().then( () => {
                        updatedUser.password = "xxxxxxxxx";
                        return res.json({user : updatedUser})
                    })
                })
            })
        })
    })
})

router.post('/unfollowUser', tokenizer.verifyToken, (req, res)=>{
    User.findById(req.user._id)
    .then(user => {
        user.followings = user.followings.filter(following => following != req.body.username);
        user.save().then(() => {
            User.find({username : req.body.username})
            .then( users => {
                const followedUser = users[0];
                followedUser.followers = followedUser.followers.filter(follower => follower != req.user.username);
                followedUser.save().then(updatedUser => {
                    
                    updatedUser.password = "xxxxxxxxx";

                    res.json({user : updatedUser})
                
                })
            })
        })
    })
})

router.post('/Login', (req, res) =>{
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

router.post('/editProfile', tokenizer.verifyToken ,(req, res) =>{

    User.findById(req.user._id)
    .then(user => {
        const { name, age, dob, email } = req.body.updatedUser;
        user.name = name;
        user.age = age;
        user.dob = dob;
        user.email = email;

        user.save().then(user => res.json({ user }) )
    })
    .catch( err => res.json({ err }))    
})

router.post('/editPassword', tokenizer.verifyToken ,(req, res) =>{

    User.findById(req.user._id)
    .then(user => {
        user.password = req.body.password;

        user.save().then(user => res.json({ user }) )
    })
    .catch( err => res.json({ err }))    
})

module.exports = router;