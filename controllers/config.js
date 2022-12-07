require("dotenv").config();

module.exports = {

    mongo: {
        url: process.env.MONGODB_URL
    }

}