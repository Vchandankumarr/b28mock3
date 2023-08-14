const express = require("express");
const { BookingModel } = require("../models/Bookingmodel");
const { FlightModel } = require("../models/Flightmodel");
const bookingRoute = express.Router();

bookingRoute.get("/dashboard", async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate(
        "flight",
        "-_id airline flightNo departure arrival departureTime arrivalTime seats price"
      )
      .populate("user", "-_id name email");

    res.status(200).send(bookings);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving bookings", error: err.message });
  }
});

bookingRoute.post("/booking", async (req, res) => {
  try {
    
    const { userID, flightID } = req.body;
    console.log(req.body)
    console.log(userID,flightID)
    if (!flightID || !userID) {
      return res
        .status(400)
        .send({ msg: "Flight ID and User ID are required" });
    }
    const flight = await FlightModel.findById(flightID);
    if (!flight) {
      return res.status(404).send({ msg: "Flight not found" });
    }
    const existingBooking = await BookingModel.findOne({ user: userID, flight: flightID });
    if (existingBooking) {
      return res.status(400).send({ msg: "Flight already booked by the user" });
    }

    const booking = new BookingModel({ user: userID, flight: flightID });
    await booking.save();

    res.status(200).send({ msg: "Flight booked successfully", booking })

  } catch (err) {
    res.status(500).send({ msg: "Error in booking flight", error: err.message });
  }
});

module.exports={
    bookingRoute
}