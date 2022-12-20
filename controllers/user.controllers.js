const { User } = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const gravatarUrl = require("gravatar-url")
require('dotenv').config();

const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body
    const userFound = await User.findOne({
        where: {
            email
        }
    })
    if (!userFound) {
        try {
            //tạo avatar mặc định
            const avatarUrl = gravatarUrl(email)
            //bcrypt tao ra chuoi ngau nhien
            const salt = bcrypt.genSaltSync(10)
            //mã hoá 
            const hashPassWord = bcrypt.hashSync(password, salt)
            const newUser = await User.create({ name, email, password: hashPassWord, avatar: avatarUrl, numberPhone })
            res.status(201).send(newUser)
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.status(500).send({ messeger: "email đã tồn tại" })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        // console.log(user.dataValues.password)
        // console.log(password)
        if (user) {

            const isAuth = bcrypt.compareSync(password, user.dataValues.password)
            // console.log(isAuth)
            if (isAuth) {
                const token = jwt.sign({ userId: user.id, email: user.email, type: user.type }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
                res.status(200).send({ messeger: "đăng nhập thành công", token })
            } else {
                res.status(500).send({ messeger: "tài khoản hoặc mật khẩu không đúng" })
            }
        } else {
            res.status(404).send("không tìm thấy email phù hợp")
        }

    } catch (error) {

    }
}
const getAllUser = async (req, res) => {
    const listUSer = await User.findAll()
    res.send(listUSer)
}
const getDetailUser = async (req, res) => {
    const { id } = req.params
    const listUSer = await User.findOne({
        where: {
            id
        }
    })
    res.send(listUSer)
}
const uploadAvatar = async (req, res) => {
    const { user } = req
    const { file } = req //lấy file từ ng dùng gửi lên
    console.log(file)
    const urlImage = `http://localhost:${process.env.PORT}/${file.path}`
    const userFound = await User.findOne({
        where: {
            id: user.userId
        }
    })
    userFound.avatar = urlImage
    await userFound.save()
    res.send(userFound)
}
const updateProfile = async (req, res) => {
    const { name, email, password, numberPhone } = req.body
    const { user } = req

    console.log(user.userId)
    const userFound = await User.findOne({
        where: {
            id: user.userId
        }
    })

    const checkEmail = await User.findOne({
        where: {
            email
        }
    })
    if (userFound) {
        userFound.name = name
        //bcrypt tao ra chuoi ngau nhien
        const salt = bcrypt.genSaltSync(10)
        //mã hoá 
        const hashPassWord = bcrypt.hashSync(password, salt)
        userFound.password = hashPassWord
        userFound.numberPhone = numberPhone
        if (!checkEmail) {

            userFound.email = email
        } else {
            res.send({ messeger: "email đã tồn tại" })
        }

        await userFound.save()
        res.status(200).send(userFound)
    } else {
        res.status(500).send({ messeger: "user không tồn tại" })
    }

}
const updateProfileUser = async (req, res) => {
    const { name, email, password, numberPhone } = req.body
    const { id } = req.params
    const userFound = await User.findOne({
        where: {
            id
        }
    })
    const checkEmail = await User.findOne({
        where: {
            email
        }
    })
    if (userFound) {

        userFound.name = name
        //bcrypt tao ra chuoi ngau nhien
        const salt = bcrypt.genSaltSync(10)
        //mã hoá 
        const hashPassWord = bcrypt.hashSync(password, salt)
        userFound.password = hashPassWord
        userFound.numberPhone = numberPhone

        if (!checkEmail) {

            userFound.email = email
        } else {
            res.send({ messeger: "email đã tồn tại" })
        }


        await userFound.save()
        res.status(200).send(userFound)
    } else {
        res.status(500).send({ messeger: "user không tồn tại" })
    }
}
const deleteUser = async (req, res) => {
    const { id } = req.params
    const userFound = await User.findOne({
        where: {
            id
        }
    })
    if (userFound) {
        await User.destroy({
            where: {
                id
            }
        })
        res.status(200).send({ messeger: `đã xoá user có id :${id}` })
    } else {
        res.status(500).send({ messeger: "user không tồn tại" })
    }
}
const updateAvatarUser = async (req, res) => {
    const { file } = req
    console.log(file)

    const { id } = req.params
    const userFound = await User.findOne({
        where: {
            id
        }
    })
    if (userFound) {
        const urlImage = `http://localhost:${process.env.PORT}/${file.path}`
        userFound.avatar = urlImage
        await userFound.save()
        res.send(userFound)
    } else {
        res.send({ messeger: "user không tồn tại" })
    }
}
module.exports = {
    register,
    login,
    getAllUser,
    uploadAvatar,
    getDetailUser,
    updateProfile,
    updateProfileUser,
    deleteUser,
    updateAvatarUser

}