const mongoose = require('mongoose');

const bikeInfo = new mongoose.Schema({
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
    
})

const Bike = mongoose.model("Bike", bikeInfo);

module.exports = Bike;