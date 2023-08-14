const express = require("express");
const { FlightModel } = require("../models/Flightmodel");

const Flightrouter = express.Router();


Flightrouter.get("/flightsss",(req,res)=>[
    res.send("flights router")
])

Flightrouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).send(flights);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving flight details", error: err.message });
  }
});

Flightrouter.get("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const flights = await FlightModel.findById(id);

    if (!flights) {
      res.status(404).send({ msg: "Flight not found" });
    }
    res.status(200).send(flights);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving flight details", error: err.message });
  }
});

Flightrouter.post("/flights", async (req, res) => {
  try {
    const {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    const flight = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });
    await flight.save();

    res.status(200).send({ msg: "Flight created successfully", flight });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in creating flight", error: err.message });
  }
});

Flightrouter.put("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    const flights = await FlightModel.findByIdAndUpdate(id,
      {
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      },
      { new: true }
    );

    if (!flights) {
      res.status(404).send({ msg: "Flight not found" });
    }
    res.status(200).send({ msg: "Flight updated successfully", flights });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving flight details", error: err.message });
  }
});

Flightrouter.delete("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const flight = await FlightModel.findByIdAndDelete(id);
    if (!flight) {
      return res.status(404).send({ msg: "Flight not found" });
    }

    res.status(200).send({ msg: "Flight deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in deleting flight", error: err.message });
  }
});

module.exports={
    Flightrouter
}