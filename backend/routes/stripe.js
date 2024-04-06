const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create({
    source: req.body.token,
    amount: req.body.amount,
    currency: "INR",
  });
});
module.exports = router;
