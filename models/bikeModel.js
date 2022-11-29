const mongoose = require('mongoose');

const bikeDetails = new mongoose.Schema({
    id: String,
    url: String,
    makerId: String,
    maker: String,
    year: String,
    model: String,
    family: String,
    category: String,
    subcategory: String,
    buildKind: String,
    isFrameset: Boolean,
    isEbike: Boolean,
    gender: String,
      prices : [
          {
              currency: String,
              amount: Number,
          }
      ],
      images : [
          {
              url: String,
              dimensions: {
                  width: Number,
                  height: Number,
              }
          }
      ],
  });
  
const bikeDets = mongoose.model("BikeDetails", bikeDetails);

module.exports = bikeDets;