const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifytoken");

const {
  CreateProduct,
  UpdatedProduct,
  DeleteProduct,
  GetProduct,
  AllProducts,
} = require("../controllers/Product");

//create product
router.post("/create", verifyTokenAndAdmin, CreateProduct);

//update product
router.put("/:id", verifyTokenAndAdmin, UpdatedProduct);

//delete product
router.delete("/:id", verifyTokenAndAdmin, DeleteProduct);

//get product
router.get("/find/:id", verifyTokenAndAdmin, GetProduct);

router.get("/allproducts", verifyTokenAndAdmin, AllProducts);
module.exports = router;
