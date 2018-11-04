const router = require('express').Router();
const tokenizer = require('../../middleware/tokenizer');

const Comment = require('../../models/comment');

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

router.delete('/' , tokenizer.verifyToken , (req, res)=>{

})

router.delete('/deleteReply', tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.replies = comment.replies.filter(reply => reply._id === req.body.id)
        comment.save().then(comment => res.json({ comment }))
    })
})

 
module.exports = router;