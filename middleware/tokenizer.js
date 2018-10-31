const jwt = require('jsonwebtokens');

const secretKey = process.env.SECRET_KEY || "The secretest";

module.exports = {
    createToken: (user) => {
        jwt.sign(user , secretKey ,(authData) =>{
            
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