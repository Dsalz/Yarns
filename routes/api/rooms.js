const express = require('express');

const router = express.Router();

const tokenizer = require('../../middleware/tokenizer');

const Room = require('../../models/room');
const Comment = require('../../models/comment');
const User = require('../../models/user');

// router.get('house/:house_name', (req, res) => {

// })

router.get('/getLatest', (req, res) => {
    Room.find({ isActive : true })
    .then(rooms => res.json({ rooms }))
    .catch(err => res.json({success: false , err}))
})

router.get('/getRoomsICreated', tokenizer.verifyToken , (req, res) => {

    Room.find({creatorName : req.user.username , isActive : true})
    .then(rooms => res.json({ rooms }))
    .catch(err => res.json({success : false, err }))
})

router.get('/:roomName', (req, res) => {
    Room.find({name: req.params.roomName , isActive : true })
    .then(rooms => res.json({ room : rooms[0] }))
    .catch(err => res.json({success: false , err }))
})

router.get('/getUserRoomsCreated/:username', (req,res)=>{
    Room.find({creatorName : req.params.username , isActive : true})
    .then(rooms => res.json({ rooms }))
    .catch(err => res.json({success: false , err }))
})

router.post('/add', tokenizer.verifyToken, (req, res) => {
    
    const {name, houseName } = req.body.roomDto;

    const room = new Room({
        name,
        houseName,
        creatorId : req.user._id,
        creatorName : req.user.username
    });

    room.save().then((room) => {
        const { message, roomName, imageUrl, imageName } = req.body.comment;

        const comment = new Comment({
            message,
            roomName,
            imageUrl,
            imageName,
            authorId : req.user._id,
            authorName : req.user.username,
            replies: []
        })

        comment.save().then((comment) => {
            User.findById(req.user._id)
            .then( user => {
                user.roomsCreated += 1;

                user.save()
                .then( () => res.json({room, comment}))
                .catch( err => res.json({ success : false , err }))

            })
        
        })
        .catch( err => res.json({ success : false , err }))
    })

})

router.delete('/:id', tokenizer.verifyToken, (req, res) => {
    Room.findById(req.params.id)
    .then(room => {
        if(room.creatorId === req.user._id || req.user.username === 'Dsalz'){
            room.isActive = false;
            
            room.save().then(
                User.findById(req.user._id)
                .then(user => {
                    user.roomsCreated -= 1;
                    user.save()
                    .then( () => res.json({ success : true, id : req.params.id }))
                    .catch( err => res.json({ success : false , err }))
                })
            )
        }
    }).catch( err => res.json({ success : false , err }))
})

module.exports = router;