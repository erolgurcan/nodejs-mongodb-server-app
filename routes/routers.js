const router = require("express").Router();
const {
  userCreate,
  userUpdate,
  userLogin,
} = require("../controllers/userRouter");

const { getBike, getBikeById } = require("../controllers/shopingRouter");

router.post("/user/create", userCreate);

router.put("/user/update", userUpdate);

router.post("/user/login", userLogin);

router.delete("/user/delete", (req, res) => {
  console.log("asd");
});

router.get("/shop/all", getBike);

router.get("/shop/:id", getBikeById);

module.exports = router;
