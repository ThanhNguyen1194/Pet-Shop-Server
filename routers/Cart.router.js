const express = require("express")
const { createOrder, getAllOrder, getDetailOrder, deleteOrder } = require("../controllers/cart.controller")
const { authenticate } = require("../middleware/auth/authenticate")
const { authorize } = require("../middleware/auth/authorize")
const cartRouter = express.Router()

cartRouter.post("/create-order", authenticate, createOrder)
cartRouter.get("/", getAllOrder)
cartRouter.get("/:id", getDetailOrder)
cartRouter.delete("/:id", authenticate, authorize(["ADMIN"]), deleteOrder)

module.exports = {
    cartRouter
}