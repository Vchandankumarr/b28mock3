const jwt=require("jsonwebtoken")


const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        console.log(token)
        if(!token){
            res.status(401).send({msg:"Login again session expired"})
        }
            else{
                console.log("decoded")
                const decodeToken=jwt.verify(token, process.env.token)
                const {userID}=decodeToken
                // console.log(userID)
                req.body.userID=userID
        
                next()
            }
        
    } catch (err) {
        return res.status(401).send({msg:"Unauthorized"})
    }
}

module.exports={authMiddleware}