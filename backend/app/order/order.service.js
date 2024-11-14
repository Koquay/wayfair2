const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let res;

require("./order.model");
require("../product/product.model");

const Order = require("mongoose").model("Order");

exports.placeOrder = async (req, response) => {
    
  const orderData = req.body;
  console.log('orderData', orderData)
  res = response;

  const bearer = req.headers.authorization.split(" ")[1];

  console.log('bearer', bearer)

  try {
    const { userId } = jwt.verify(bearer, process.env.JWT_SECRET);

    if(!userId) {
      return res.status(422).send(`You must be logged in to place an order`)
  }

    let newOrder = new Order(orderData.orderData);
    console.log("newOrder", newOrder);

    newOrder.userId = userId;
    
    await newOrder.save();

    const returnOrder = await getOrder(newOrder._id);
    res.status(201).json(returnOrder);
  } catch (error) {
    console.log("error", error);
  }
};

const getOrder = async (orderId) => {
  try {
    const order = await Order.findOne({
      _id: orderId,
    }).populate({
      path: "items.product",
      model: "Product",
    });

    console.log("newOrder", order);

    return order;
  } catch (error) {
    console.error(error);
    return res.status(500).send("Problem getting order..");
  }
};