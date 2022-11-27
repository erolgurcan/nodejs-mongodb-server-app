const router = require("express").Router();
const { userCreate, userUpdate, userLogin } = require("../controllers/userRouter");

router.post("/user/create", userCreate);

router.put("/user/update", userUpdate);
  
router.get("/user/login",userLogin);

  
  router.delete("/user/delete", (req, res) => {
    console.log("asd");
  });
  

module.exports = router;