const mongoose=require("mongoose")

const {Schema}=mongoose

const BookingSchema=mongoose.Schema({
    user : { type: Schema.Types.ObjectId,   ref: 'user' },
    flight : { type: Schema.Types.ObjectId,  ref: 'flight' }

})


const BookingModel=mongoose.model("booking",BookingSchema)

module.exports={
    BookingModel
}