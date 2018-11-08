const express = require('express');

const router = express.Router();

const tokenizer = require('../../middleware/tokenizer');

const Room = require('../../models/room');
const Comment = require('../../models/comment');

// router.get('house/:house_name', (req, res) => {

// })

// router.get('estate/:estate_name', (req, res) => {

// })

router.get('/getLatest', (req, res) => {
    Room.find()
    .then(rooms => res.json({ rooms }))
    .catch(err => console.log(err))
})

router.get('/:roomName', (req, res) => {
    Room.find({name: req.params.roomName})
    .then(room => res.json({ room }))
    .catch(err => console.log(err));
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
        const { message, roomName } = req.body.comment;

        const comment = new Comment({
            message,
            roomName,
            authorId : req.user._id,
            authorName : req.user.username,
            replies: []
        })

        comment.save().then((comment) => res.json({room, comment}))
        .catch((err) => res.json({success: false}))
    })

})

module.exports = router;