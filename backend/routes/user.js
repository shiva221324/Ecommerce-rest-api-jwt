const express = require("express");
const router = express.Router();

const { Update, Delete, GetUser, AllUsers } = require("../controllers/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifytoken");

//update
router.put("/:id", verifyTokenAndAuthorization, Update);

//delete
router.delete("/:id", verifyTokenAndAuthorization, Delete);

//find specific user
router.get("/find/:id", verifyTokenAndAdmin, GetUser);

//get all users
router.get("/allusers", verifyTokenAndAdmin, AllUsers);

module.exports = router;
