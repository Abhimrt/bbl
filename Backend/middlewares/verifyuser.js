require('dotenv/config')
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const fetchuser = (req,res,next)=>{
    const token =req.header('auth-token')
    if (!token){
        return res.status(401).send({success: false,error:"Please authentiate with correct crediantials1"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({success: false,error:"Please authentiate with correct crediantials"})
    }

}
module.exports= fetchuser