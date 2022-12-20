const express = require("express")
const { createProduct, uploadProductImage, updateInforProduct, deleteProduct, getAllProduct, getProductDetail } = require("../controllers/product.controller")
const { authenticate } = require("../middleware/auth/authenticate")
const { authorize } = require("../middleware/auth/authorize")
const { uploadImage } = require("../middleware/upload/upload_img")
const productRouter = express.Router()

productRouter.post("/upload-product", authenticate, authorize(["ADMIN", "SUBADMIN"]), createProduct)
productRouter.post("/:id", authenticate, authorize(["ADMIN", "SUBADMIN"]), uploadImage("product"), uploadProductImage)
productRouter.put("/:id", authenticate, authorize(["ADMIN", "SUBADMIN"]), updateInforProduct)
productRouter.delete("/:id", authenticate, authorize(["ADMIN", "SUBADMIN"]), deleteProduct)
productRouter.get("/", getAllProduct)
productRouter.get("/:id", getProductDetail)

module.exports = {
    productRouter
}