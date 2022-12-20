const { Product } = require("../models/index")
const gravatarUrl = require("gravatar-url")

require('dotenv').config();
const url = `http://localhost:${process.env.PORT}`

const createProduct = async (req, res) => {
    const { productName, type, price, description } = req.body

    //tạo image mặc định
    const avatarUrl = gravatarUrl(productName)
    const newProduct = await Product.create({ productName, type, price, description, image: avatarUrl })
    res.send(newProduct)

}
const uploadProductImage = async (req, res) => {
    const { id } = req.params
    const { file } = req //lấy file từ ng dùng gửi lên

    const urlImage = `${url}/${file.path}`
    const productFound = await Product.findOne({
        where: {
            id
        }
    })
    if (productFound) {

        productFound.image = urlImage
        await productFound.save()
        res.send(productFound)
    } else {
        res.send({ message: "not found" })
    }
}
const updateInforProduct = async (req, res) => {
    const { id } = req.params
    const { productName, type, price, description } = req.body
    const productFound = await Product.findOne({
        where: {
            id
        }
    })
    if (productFound) {

        productFound.productName = productName
        productFound.type = type
        productFound.price = price
        productFound.description = description
        await productFound.save()
        res.send(productFound)
    } else {
        res.send({ message: "not found" })
    }

}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    const productFound = await Product.findOne({
        where: {
            id
        }
    })
    if (productFound) {

        await Product.destroy({
            where: {
                id
            }
        })
        res.send({ message: `xoá thành công product với id: ${id}` })
    } else {
        res.send({ message: "not found" })
    }
}
const getAllProduct = async (req, res) => {
    const listProduct = await Product.findAll()
    res.send(listProduct)
}
const getProductDetail = async (req, res) => {
    const { id } = req.params
    const productFound = Product.findOne({
        where: {
            id
        }
    })
    if (productFound) {
        res.status(200).send(productFound)
    } else {
        res.status(500).send({ message: "not found" })
    }
}
module.exports = {
    createProduct,
    uploadProductImage,
    updateInforProduct,
    deleteProduct,
    getAllProduct,
    getProductDetail
}