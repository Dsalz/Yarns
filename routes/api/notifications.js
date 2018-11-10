const express = require('express');
const router = express.Router();

const tokenizer = require('../../middleware/tokenizer');
const Notification = require('../../models/notification');

router.get("/" , tokenizer.verifyToken, (req, res)=>{
    Notification.find({recipientId : req.user._id}).then(notifications => res.json({ notifications }))
    .catch(err => res.json({ err }));
})

router.get("/markAllAsRead" , tokenizer.verifyToken, (req, res) => {
    Notification.find({ recipientId : req.user._id }).then( notifications => {
        const newNotifs = notifications.filter(notification => !notification.isRead);
        for(let i = 0; i < newNotifs.length; i++){
            if(i === newNotifs.length - 1){
                newNotifs[i].isRead = true;
                newNotifs[i].save().then( () => res.json({success : true}));
            }else{
                newNotifs[i].isRead = true;
                newNotifs[i].save();
            }
        }
    })
})

// router.post("/" , tokenizer.verifyToken, (req, res)=>{
//     const notification = new Notification({
//         message: req.body.message,
//         recipientId: req.body.userId,
//         creatorusername: req.user._id
//     })
//     notification.save().then(resp => res.json({ success : true})).catch(err => res.json({ success: false }))
// })

// router.get('/isread', (req, res) =>{

//     Notification.find({userId : req.user.id}).then(items => {
        
//         for(var notif of items){
//             notif.isRead = true;
//         }
//         res.json({items})
//     })
//     .catch(err => res.json({ err }));
// })

module.exports = router;