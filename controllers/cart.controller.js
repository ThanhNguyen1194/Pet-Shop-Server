const { Cart, User, Product } = require("../models/index")

const createOrder = async (req, res) => {
    const { user_id, product_id } = req.body
    const newOrder = await Cart.create({ user_id, product_id })
    res.send(newOrder)
}
const getAllOrder = async (req, res) => {
    const listOrder = await Cart.findAll()
    res.send(listOrder)
}
const getDetailOrder = async (req, res) => {
    const { id } = req.params
    const orderFound = await Cart.findOne({
        where: {
            id
        },
        include: [
            {
                model: User,
            },
            {
                model: Product,
            }
        ]
    })
    if (orderFound) {
        res.send(orderFound)
    } else {
        res.send("not found")
    }
}
const deleteOrder = async (req, res) => {
    const { id } = req.params
    const orderFound = await Cart.findOne({
        where: {
            id
        }
    })
    if (orderFound) {

        await Cart.destroy({ where: { id } })
        res.send(`xoá thành công Order với id : ${id}`)
    } else {

        res.send("not found")
    }
}
module.exports = {
    createOrder,
    getAllOrder,
    getDetailOrder,
    deleteOrder
}