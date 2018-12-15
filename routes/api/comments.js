const router = require('express').Router();
const tokenizer = require('../../middleware/tokenizer');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStore = require('multer-storage-cloudinary');

const Comment = require('../../models/comment');
const Room = require('../../models/room');
const User = require('../../models/user');
const Notification = require('../../models/notification');

//Initializing Cloudinary
const cloudinaryConfig = require('../../config/keys').cloudinaryConfig;
cloudinary.config(cloudinaryConfig);

const storage = cloudinaryStore({
    cloudinary,
    folder: "YarnsImgs",
    transformation: [
        { width : 300 },
        { height : 300 },
        { crop : "limit" },
    ]
});

const parser = multer({ storage: storage});

router.get('/room/:roomName', (req, res)=> {
    Comment.find({roomName : req.params.roomName , isActive: true})
    .then(comments => res.json({ comments }))
    .catch(err => res.json({ success: false, err }))
})

router.post('/storeImg', tokenizer.verifyToken, parser.single('file') ,(req, res)=>{
    return res.json({ url : req.file.secure_url , name : req.file.originalname})
})

router.post('/addReply', tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.replies.push({
            message: req.body.reply,
            authorName: req.user.username,
            authorId: req.user._id
        }) 
        comment.save().then(updatedComment => {

            if(req.user._id != comment.authorId){
                const notification = new Notification({
                    type: "new_reply",
                    message: ` replied "${req.body.reply}" to your comment "${comment.message}" in the ${comment.roomName} room.`,
                    recipientId: comment.authorId,
                    creatorUsername: req.user.username
                })
    
                notification.save()
                .then( () => res.json({ comment: updatedComment }))
                .catch(err => res.json({ success: false, err }))
            }
            else{
                return res.json({ comment : updatedComment})
            }

        }).catch(err => res.json({ success: false, err }))

    }).catch(err => res.json({ success: false, err }))
})

router.delete('/:id' , tokenizer.verifyToken , (req, res)=>{
    Comment.findById(req.params.id)
    .then(comment => {
        if(comment.authorId === req.user._id){
            comment.remove().then(() => {
                Room.find({name : comment.roomName}).then(rooms =>{
                    const room = rooms[0];
                    room.commentNo -= 1;
                    room.save()
                    .then(() => res.json({ success : true}))
                    .catch(err => res.json({ success: false, err }))
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
            comment.save().then( updatedComment => {
                User.findById(req.user._id)
                .then(user => {
                    (user.accolades) ? user.accolades.push(updatedComment._id) : user.accolades = [].push(updatedComment._id);

                    user.save().then( updatedUser => {

                        if(req.user._id !== comment.authorId){
                            const notification = new Notification({
                                type: "accolade_given",
                                recipientId: comment.authorId,
                                creatorUsername: req.user.username,
                                message: ` gave your comment "${comment.message}" in the ${comment.roomName} room an accolade`
                            })
                            
                            notification.save().then(() => res.json({ updatedUser, updatedComment }) )
                        }
                        else{
                            return res.json({ updatedUser, updatedComment })
                        }
                    }).catch(err => res.json({ success: false, err }))

                }).catch(err => res.json({ success: false, err }))

            })

        }).catch(err => res.json({ success: false, err }))
})

router.post('/removeAccolade' , tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.accolades -= 1;
        comment.save().then( comment => {
            User.findById(req.user._id)
            .then(user => {
                user.accolades = user.accolades.filter(commentId => commentId != req.body.commentId);

                user.save()
                .then( user => res.json({ user, comment }))
                .catch(err => res.json({ success: false, err }))

            }).catch(err => res.json({ success: false, err }))

        })

    }).catch(err => res.json({ success: false, err }))

})

router.get('/mine' , tokenizer.verifyToken , (req, res) => {
    Comment.find({ authorId : req.user._id})
    .then(comments => res.json({ comments }))
    .catch(err => res.json({ success: false, err }))
})

router.get('/getUserComments/:username' , (req, res) => {
    Comment.find({authorName : req.params.username})
    .then(comments => res.json({ comments }))
    .catch(err => res.json({ success: false, err }))
})

router.post('/addComment', tokenizer.verifyToken, (req, res)=>{
    const { message , roomName, imageUrl, imageName } = req.body.comment;

        var comment = new Comment ({
            message,
            roomName,
            authorId: req.user._id,
            authorName: req.user.username,
            replies: [],
            imageUrl,
            imageName
        });

        comment.save().then(savedComment => {
            
            Room.find({name : roomName}).then(rooms =>{
                const room = rooms[0];
                room.commentNo += 1;
                room.save().then(() => {
                    if(req.user._id !== room.creatorId){
                        const notification = new Notification({
                            type: "new_comment_in_room",
                            recipientId: room.creatorId,
                            creatorUsername: req.user.username,
                            message: ` commented "${ message }" in the ${ roomName } room you created`
                        });

                        notification.save()
                        .then(() => res.json({ savedComment }))
                        .catch(err => res.json({ success: false, err }))
                    }
                    else{
                        return res.json({ savedComment });
                    }

                })

            }).catch(err => res.json({ success: false, err }))

        }).catch(err => res.json({ success: false, err }))
})

router.post('/deleteReply', tokenizer.verifyToken, (req, res) => {
    Comment.findById(req.body.commentId)
    .then(comment => {
        comment.replies = comment.replies.filter(reply => reply._id === req.body.id);

        comment.save()
        .then(comment => res.json({ comment }))
        .catch(err => res.json({ success: false, err }))

    }).catch(err => res.json({ success: false, err }))
})

router.get('/CommentsWithUserAccolades/:username', (req, res)=>{
    User.find({username : req.params.username})
    .then( users => {
        const user = users[0];
        const commentIds = [];

        for(let i=0; i<user.accolades.length ; i++){
            commentIds.push(new mongoose.Types.ObjectId(user.accolades[i]));
        }

        Comment.find( { _id : { $in : commentIds}})
        .then(comments => res.json({ comments }))
        .catch(err => res.json({ success: false , err}))
    
    }).catch(err => res.json({ success: false, err }))
    
})

router.get('/CommentsWithMyAccolades' , tokenizer.verifyToken , (req, res) => {
        
    User.findById(req.user._id)
    .then(user => {
        const commentIds = [];

        for(let i=0; i<user.accolades.length ; i++){
            commentIds.push(new mongoose.Types.ObjectId(user.accolades[i]));
        }

        Comment.find( { _id : { $in : commentIds}})
        .then(comments => res.json({ comments }))
        .catch(err => res.json({ success: false , err}))
    
    }).catch(err => res.json({ success: false, err })) 
})

 
module.exports = router;