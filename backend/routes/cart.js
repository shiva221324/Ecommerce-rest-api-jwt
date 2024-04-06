const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifytoken");

const {
  CreateCart,
  UpdatedCart,
  DeleteCart,
  GetCart,
  AllCarts,
} = require("../controllers/Cart");

//create cart
router.post("/create", verifyToken, CreateCart);

//update cart
router.put("/:id", verifyTokenAndAuthorization, UpdatedCart);

//delete cart
router.delete("/:id", verifyTokenAndAuthorization, DeleteCart);

// //get cart
router.get("/find/:userId", verifyTokenAndAuthorization, GetCart);

// //all carts
router.get("/allcarts", verifyTokenAndAdmin, AllCarts);
module.exports = router;
