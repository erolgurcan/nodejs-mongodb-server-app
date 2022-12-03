const mongoose = require("mongoose");
const config = require("../controllers/config");
const Order = require("../models/orderModel");



const addOrder = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        mobileNo,
        address,
        Country,
        City,
        State,
        Zip,
        orderedItems,
        total,
        orderDate,
        orderStatus,
        paymentMethod,
        paymentStatus,
    } = req.body;
    
    console.log(req.body)

    //Check if all fields are filled
    if (
        !firstName ||
        !lastName ||
        !email ||
    
        !orderStatus ||
        !paymentMethod ||
        !paymentStatus
    ) {
        return res.status(400).json({ msg: "Please fill all fields" });
    }

    try {
        await mongoose.connect(config.mongo.url);

        const newOrder = new Order({
            firstName,
            lastName,
            email,
            mobileNo,
            address,
            Country,
            City,
            State,
            Zip,
            total,
            orderDate,
            orderStatus,
            paymentMethod,
            paymentStatus,
        });

        const savedOrder = await newOrder.save();

        res.json(savedOrder);
    } catch (error) {   
        console.log(error);
        res.status(400);
    }

}


module.exports = { addOrder }; 