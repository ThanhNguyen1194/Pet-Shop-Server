const express = require("express")
const { getAllOrder, createOrder } = require("../controllers/cart.controller")
const { authenticate } = require("../middleware/auth/authenticate")
const cartRouter = express.Router()

cartRouter.get("/", getAllOrder)
cartRouter.post("/create-order", authenticate, createOrder)

module.exports = {
    cartRouter
}