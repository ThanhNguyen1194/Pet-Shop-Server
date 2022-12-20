const express = require("express")
const { register, login, getAllUser, uploadAvatar, getDetailUser, updateProfile, deleteUser, updateProfileUser, updateAvatarUser } = require("../controllers/user.controllers")
const { uploadImage } = require("../middleware/upload/upload_img")

const { authenticate } = require("../middleware/auth/authenticate")
const { authorize } = require("../middleware/auth/authorize")

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/", getAllUser)
userRouter.get("/:id", getDetailUser)
userRouter.post("/upload-avatar", authenticate, uploadImage("user"), uploadAvatar)
userRouter.put("/update-profile", authenticate, uploadImage("user"), updateProfile)
userRouter.put("/update-user/:id", authenticate, authorize(["ADMIN", "SUBADMIN"]), uploadImage("user"), updateProfileUser)
userRouter.put("/update-avatar-user/:id", authenticate, authorize(["ADMIN", "SUBADMIN"]), uploadImage("user"), updateAvatarUser)
userRouter.delete("/:id", authenticate, authorize(["ADMIN", "SUBADMIN"]), deleteUser)




module.exports = {
    userRouter
}