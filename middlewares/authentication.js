const { validateToken } = require("../services/authentication");

function checkforAuthentication(cookieName) {
    return (req,res,next)=>{
        const tokenCookievalue = req.cookies[cookieName];
        if(!tokenCookievalue)
        return next();
    }
        try {
            const payload = validateToken(tokenCookievalue);
            req.user = payload;
        } catch (error) {
            console.log(error);
        }
        return next();
}

module.exports = checkforAuthentication;