const mongoose = require("mongoose");
const config = require("../controllers/config");
const Bike = require("../models/bike");
const bikeDets = require("../models/bikeModel");

const getBike = async (req, res) => {
  try {
    await mongoose.connect(config.mongo.url);

    const bike = await Bike.find({});

    res.json(bike);
  } catch (error) {
    console.log(error);

    res.status(400);
  }
};

const getBikeById = async (req, res) => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log(req.params.id)

    const bikeDetails = await bikeDets.find({ id: req.params.id });

    console.log(bikeDetails)
    res.json(bikeDetails);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = {
  getBike,
  getBikeById,
};
