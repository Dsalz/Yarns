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

    verifyToken: (req, res, next)=>{
        const authorization = req.headers["authorization"] || null;
        if(!authorization){
            return res.status(403).json({message: "not signed in"})
        }


        
        jwt.verify(authorization.split(' ')[1], secretKey , (err, data) => {
            if(err){
                return res.status(403).json({message: "invalid token"})
            }
            req.user = data.user;
            next();
        })
    }
}