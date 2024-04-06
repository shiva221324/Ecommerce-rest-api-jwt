const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifytoken");

const {
  CreateOrder,
  UpdatedOrder,
  DeleteOrder,
  GetOrder,
  AllOrders,
  MonthIncome,
} = require("../controllers/Order");

router.post("/create", verifyToken, CreateOrder);

//update order
router.put("/:id", verifyTokenAndAdmin, UpdatedOrder);

//delete order
router.delete("/:id", verifyTokenAndAdmin, DeleteOrder);

//get order
router.get("/find/:userId", verifyTokenAndAuthorization, GetOrder);

//all orders
router.get("/allcarts", verifyTokenAndAdmin, AllOrders);

router.get("/income", verifyTokenAndAdmin, MonthIncome);
module.exports = router;
