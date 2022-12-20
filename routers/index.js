const express = require("express")
const { cartRouter } = require("./cart.router")
const { productRouter } = require("./product.router")
const { userRouter } = require("./user.router")
const rootRouter = express.Router()


rootRouter.use("/users", userRouter)
rootRouter.use("/products", productRouter)
rootRouter.use("/carts", cartRouter)

module.exports = {
    rootRouter
}