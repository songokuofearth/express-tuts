const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomString";

const auth = (req,res,next) =>{
    const token = req.headers.token;

    if(!token){
        res.status(403).json({
            message : "access denied no token"
        })
    }else{
        try {
            const decodeddata = jwt.verify(token,JWT_SECRET);
            console.log(decodeddata.id);
            
            req.userId = decodeddata.id;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }
}

module.exports = auth;