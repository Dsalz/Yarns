const express = require('express');
const router = express.Router();

const Notification = require('../../models/notification');

router.get("/" , (req, res)=>{
    Notification.find({userId : req.user.id}).then(items => res.json({items}))
    .catch(err => res.json({ err }));
})

router.post("/" , (req, res)=>{
    const notification = new Notification({
        message: req.body.message,
        userId: req.body.userId,
        userName: req.body.userName
    })
    notification.save().then(resp => res.json({resp})).catch(err => res.json({ err }))
})

router.get('/isread', (req, res) =>{

    Notification.find({userId : req.user.id}).then(items => {
        
        for(var notif of items){
            notif.isRead = true;
        }
        res.json({items})
    })
    .catch(err => res.json({ err }));
})

