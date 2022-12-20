
//upload file
const multer = require("multer")
const mkdirp = require('mkdirp')

const uploadImage = (type) => {
    const path = `./public/images/${type}` //tạo đường dẫn
    const made = mkdirp.sync(path) //tạo thư mục
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path) //setup chỗ lưu file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname)//đặt lại tên file
        }
    })
    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const extensionImageList = [".png", ".jpg"]
            const extension = file.originalname.slice(-4)
            const check = extensionImageList.includes(extension)
            if (check) {
                cb(null, true)
            } else {
                cb(new Error("đuôi file không hợp lệ"))
            }
        }
    })
    return upload.single(type)
}


module.exports = {
    uploadImage
}