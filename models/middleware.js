const jwt = require('jsonwebtoken');

module.exports = function (req , res, next) {
    try {
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send("Login Required")
        }
        let decoded = jwt.verify(token,'jwtPassword');
        req.user = decoded.user;
        next();
        
    } catch (error) {
        return res.status(404).send("Authentication Error")
    }
}