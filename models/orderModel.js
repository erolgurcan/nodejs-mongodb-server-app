const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobileNo: String,
    address: String,
    Country: String,
    City: String,
    State: String,
    Zip: String,
    orderedItems: [],
    total: Number,
    orderDate: Date,
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
