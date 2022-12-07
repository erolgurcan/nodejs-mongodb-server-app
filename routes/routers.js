const router = require("express").Router();
const {
  userCreate,
  userUpdate,
  userLogin,
} = require("../controllers/userRouter");

const {addOrder, seeOrder, deleteOrder, updateOrder} = require("../controllers/orderRouter");

const { getBike, getBikeById } = require("../controllers/shopingRouter");

router.post("/user/create", userCreate);

router.put("/user/update", userUpdate);

router.post("/user/login", userLogin);

router.delete("/user/delete", (req, res) => {
  console.log("asd");
});

//Shoping Routers

router.get("/shop/all", getBike);

router.get("/shop/:id", getBikeById);

router.post("/shop/add", addOrder)

//Order Routers

router.get("/shop/auth/get", seeOrder)
router.delete("/shop/auth/delete", deleteOrder)
router.put("/shop/auth/update", updateOrder)

module.exports = router;
