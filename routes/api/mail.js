const router = require('express').Router();
const sendMail = require('../../middleware/sendMail');

router.post('/', (req, res) => {
    sendMail(req.body)
        .then(res => res.status(200).send({message: "Mail Sent"}))
        .catch(err => res.status(500).send({err: err}));
})

module.exports = router;