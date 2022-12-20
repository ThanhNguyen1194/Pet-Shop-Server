const { User, Product, Cart } = require("../models/index")

const createOrder = async (req, res) => {
    console.log(req.body)
    let demo = req.boby
    console.log(demo)
    console.log(req.boby)
    // console.log(user_id, product_id)
    // const newOrder = await Cart.create({ user_id, product_id })
    // res.status(201).send(newOrder)
}
const getAllOrder = async (req, res) => {
    const listOrder = await Cart.findAll({
        // include: [
        //     {
        //         model: Station,
        //         as: "from"
        //     },
        // ]
    })
    res.status(200).send(listOrder)
}
module.exports = {
    createOrder,
    getAllOrder
}