const express=require("express")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const {UserModel}=require("../models/Usermodel")

const Userrouter=express.Router()

Userrouter.get("/users",(req,res)=>{
    res.send("Userr Router ")
})

Userrouter.post("/register",async(req,res)=>{
    // res.send("reginster")

    try {
        const{name,email,password}=req.body
        const Existing_user=await UserModel.find({email})
        console.log(Existing_user)
        if(Existing_user.length>0){
            res.send({msg:"User already registerd with this email please login",email})

        }else{
            bcrypt.hash(password, 10, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    res.send(err)
                }else{
                    const new_user=new UserModel({name,email,password:hash})
                    await new_user.save()
                    res.status(200).send({msg:"User registerd Sucessfully",new_user})
                }
            });

        }

      


    } catch (error) {
        res.status(500).send({"msg":"Error"})
    }
})


Userrouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        

        console.log("user oruter")
        
        const user=await UserModel.find({email})
        
        // console.log(user)
        if(user.length){
            bcrypt.compare(password, user[0].password, async(err, result)=> {
                // result == true
                if(result){
                    var token = jwt.sign({ userID: user[0]._id }, process.env.token);

                    res.send({token,res:"Login sucessfull"})
                    

                }else{
                    res.send("Wrong credentials")
                }
            });
            

        }else{
            res.send("User NOt registerd")
        }
        console.log(user)

       
    } catch (error) {
        res.send({msg:"login faild"})
    }
})

module.exports={
    Userrouter
}