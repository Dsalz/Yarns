const router = require('express').Router();
const tokenizer = require('../../middleware/tokenizer');

const Comment = require('../../models/comment');
const Room = require('../../models/room');
const User = require('../../models/user');

router.get('/room/:roomName', (req, res)=> {
    Comment.find({roomName : req.params.roomName , isActive: true})
    .then(comments => res.json({ comments }))
    .catch(err => console.log(err))
})

router.post('/addReply', tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.replies.push({
            message: req.body.reply,
            authorName: req.user.username,
            authorId: req.user._id
        }) 
        comment.save().then(comment => res.json({ comment }))
    })
})

router.delete('/:id' , tokenizer.verifyToken , (req, res)=>{
    Comment.findById(req.params.id)
    .then(comment => {
        if(comment.authorId === req.user._id){
            comment.remove().then(() => {
                Room.find({name : comment.roomName}).then(rooms =>{
                    const room = rooms[0];
                    room.commentNo -= 1;
                    room.save().then(() => res.json({ success : true}))
                })
            })
        }
        else{
            return res.json({success : false})
        }
    }).catch(err => console.log(err))
})

router.post('/giveAccolade' , tokenizer.verifyToken, (req, res) => {
        Comment.findById(req.body.commentId)
        .then(comment => {
            comment.accolades += 1;
            comment.save().then( comment => {
                User.findById(req.user._id)
                .then(user => {
                    (user.accolades) ? user.accolades.push(comment._id) : user.accolades = [].push(comment._id);

                    user.save().then( user => res.json({ user, comment }) )
                })
            })
        }).catch(err => res.json({ err }))
})

router.post('/removeAccolade' , tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.accolades -= 1;
        comment.save().then( comment => {
            User.findById(req.user._id)
            .then(user => {
                user.accolades = user.accolades.filter(commentId => commentId != req.body.commentId);

                user.save().then( user => res.json({ user, comment }) )
            })
        })
    }).catch(err => res.json({ err }))
})

router.post('/addComment', tokenizer.verifyToken, (req, res)=>{
        var comment = new Comment ({
            message: req.body.comment.commentText,
            roomName: req.body.roomName,
            authorId: req.user._id,
            authorName: req.user.username,
            replies: []
        });

        comment.save().then(savedComment => {
            
            Room.find({name : req.body.roomName}).then(rooms =>{
                const room = rooms[0];
                room.commentNo += 1;
                room.save().then(() => res.json({ savedComment }))
            })
        })
})

router.post('/deleteReply', tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.replies = comment.replies.filter(reply => reply._id === req.body.id)
        comment.save().then(comment => res.json({ comment }))
    })
})

 
module.exports = router;