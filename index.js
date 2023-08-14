const express=require("express")

require("dotenv").config()

const {connection}=require("./configs/db")
const {Userrouter}=require("./routees/User.router")
const {Flightrouter}=require("./routees/Flight.router")
const {bookingRoute}=require("./routees/Booking.router")

const {authMiddleware}=require("./middlewares/Authentication")

const app=express()


app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Air booking system")
})

app.use("/api",Userrouter)

app.use(authMiddleware)
app.use("/api",Flightrouter)
app.use("/api",bookingRoute)

app.listen(5050,async()=>{
    try {
         await connection
         console.log("connected to data base")
         console.log(`server is running in port ${process.env.port}`)
    } catch (error) {
        
    }
})