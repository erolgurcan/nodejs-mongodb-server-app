const User = require("../models/userModel");
const config = require("../controllers/config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password)

  try {
    await mongoose.connect(config.mongo.url);

    const userCheck = await User.findOne({ email });

    if (!userCheck) return res.status(400).send("Email or password is wrong");

    const validPass = await bcrypt.compare(password, userCheck.password);

    if (!validPass) return res.status(400).send("Password Wrong");

    const token = jwt.sign({ _id: User._id, userType: userCheck.userType }, "secret");

    res.header("auth-token", token).send({
      token,
      user: {
        id: userCheck._id,
        name: userCheck.name,
        email: userCheck.email,
        userType: userCheck.userType,
      },

    });

    res.send("Logged in");

  } catch (err) {
    console.log(err);
    // res.status(400).send("Email or password is wrong");
  }
};

const userCreate = async (req, res) => {

  const { name, email, password, userType } = req.body;

  console.log(name)

    if (!name || !email || !password || !userType) {
        return res.status(400).send("Please fill all fields");
    }

    try {
        await mongoose.connect(config.mongo.url);

        // Check if user already exists

        const checkUser = await User.findOne
        ({
            email
        });

        if (checkUser) {
            return res.status(400).send("User already exists");
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            userType
        });

        const savedUser = await user.save();
        mongoose.connection.close();
        res.json(savedUser);

    } catch (err) {
        console.log(err);
        res.status(400).send("Error");
    }


    
};






const userUpdate = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    await mongoose.connect(config.mongo.url);

    const User = await user.findOne({ email });

    console.log(User);

    if (!User) return res.status(400).json({ msg: "User does not exist" });
    if (User.userType !== "admin") {
      return res.status(400).json({ msg: "Not authorized" });
    }

    const updatedUser = await User.updateOne({ $set: { name, password } });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const deleteUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }


    //delete user
    try {
        await mongoose.connect(config.mongo.url);

        const user = await User.findOne
        ({
            email
        });

        if (!user) return res.status(400).json({ msg: "User does not exist" });
        if (user.userType !== "admin") {
            return res.status(400).json({ msg: "Not authorized" });
        }

        const deletedUser = await user
        ({
            email
        }).deleteOne();

        res.json(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};



module.exports = {
  userCreate,
  userUpdate,
  userLogin
};
