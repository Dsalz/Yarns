const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || "The secretest";

module.exports = {
    createSignUpToken: (user, res ) => {
        jwt.sign({ user } , secretKey ,(err, token) =>{
           return res.json({ user , token });
        })
    },

    createLoginToken: (user, res ) => {
        jwt.sign({ user } , secretKey ,(err, token) =>{
           return res.json({ user , token , validUser : true});
        })
    },

    verifyToken: (req, res)=>{
        const authorization = req.headers["Authorization"] || null;

        if(!authorization){
            return res.status(403).json({message: "not signed in"})
        }

        jwt.verifyToken(authorization.split(' ')[0], secretKey).then( (data) => {
            req.user = data.user;
            return next();
        }).catch( (err) => {
            return res.status(403).json({message: "invalid token"})
        })
    }

}