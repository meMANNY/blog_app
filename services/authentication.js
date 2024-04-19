const JWT = require('jsonwebtoken');

const secret = "mysecretkey";

function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };

    const token = JWT.sign(payload, secret, {expiresIn: "1h"});
    return token;  
}

function validateToken(req,res,next){
    const payload = JWT.verify(payload, secret);
    return payload;
}

module.exports = {
    createToken,
    validateToken,
}