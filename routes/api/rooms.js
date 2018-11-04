const express = require('express');

const router = express.Router();

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

router.post('/add', (req, res) => {
    
    const {name, houseName, creatorId, creatorName} = req.body.roomDto;

    const room = new Room({
        name,
        houseName,
        creatorId,
        creatorName
    });

    room.save().then((room) => {
        const { message, roomName, authorId, authorName } = req.body.comment;

        const comment = new Comment({
            message,
            roomName,
            authorId,
            authorName,
            replies: [],
            roomId: room._id
        })

        comment.save().then((comment) => res.json({room, comment}))
        .catch((err) => res.json({success: false}))
    })

})

module.exports = router;