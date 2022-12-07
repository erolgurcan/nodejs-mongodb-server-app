const mongoose = require("mongoose");
const config = require("../controllers/config");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

const updateOrder = async (req, res) => {
  const jwtToken = req.header("auth-token");

  const { id, email, adress , paymentStatus} = req.body;

  console.log(id, email, adress);

  try {
    if (!jwtToken)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const payload = jwt.verify(jwtToken, "secret");

    if (payload.userType !== "admin") {
      res.status(403).json("Not Authorized");
      return;
    }

    await mongoose.connect(config.mongo.url);

    //find ID and update

    const order = await Order.findByIdAndUpdate(
      id,
      {
        email: email,
        address: adress,
        paymentStatus: paymentStatus,
      },
      {
        new: true,
      }
    );

    const orderOut = await Order.find();

    res.send(orderOut);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
};

const deleteOrder = async (req, res) => {
  const jwtToken = req.header("auth-token");

  const id = req.query.id;
  try {
    if (!jwtToken)
      return res.status(401).json({ msg: "No token, authorization denied" });

    //verify token
    if (!jwtToken) {
      res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, "secret");

    //Delete order

    if (payload.userType !== "admin") {
      res.status(403).json("Not Authorized");
      return;
    }

    await mongoose.connect(config.mongo.url);

    const order = await Order.findByIdAndDelete(id);

    const orderLeft = await Order.find();
    res.send(orderLeft);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
};

const seeOrder = async (req, res) => {
  const jwtToken = req.header("auth-token");
  console.log(jwtToken);

  try {
    if (!jwtToken)
      return res.status(401).json({ msg: "No token, authorization denied" });

    //verify token
    if (!jwtToken) {
      res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, "secret");

    console.log(payload);

    if (payload.userType !== "admin") {
      res.status(403).json("Not Authorized");
      return;
    }
    await mongoose.connect(config.mongo.url);

    const order = await Order.find();

    res.send(order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
};

const addOrder = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNo,
    address,
    country,
    city,
    state,
    zip,
    orderedItems,
    total,
    orderStatus,
    paymentMethod,
    paymentStatus,
  } = req.body;

  console.log(req.body);

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

  const orderDate = new Date();
  try {
    await mongoose.connect(config.mongo.url);

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      mobileNo,
      address,
      country,
      city,
      state,
      zip,
      total,
      orderedItems,
      orderDate,
      orderStatus,
      paymentMethod,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = { addOrder, seeOrder, deleteOrder, updateOrder };
