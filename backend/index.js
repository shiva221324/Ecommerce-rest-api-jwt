const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

// Database connection
const connectDb = require("./config/database");
connectDb();

//routes
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);
const userRoute = require("./routes/user");
app.use("/api/users", userRoute);
const productRoute = require("./routes/product");
app.use("/api/products", productRoute);
const cartRoute = require("./routes/Cart");
app.use("/api/cart", cartRoute);
const orderRoute = require("./routes/Order");
app.use("/api/order", orderRoute);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

app.route;
