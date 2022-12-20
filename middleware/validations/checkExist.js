// const { Station } = require("../../models/index")

const checkExist = (Model) => {

    return async (req, res, next) => {
        //kiểm tra xem id có tồn tại hay không
        const { id } = req.params
        const model = await Model.findOne({
            where: {
                id
            }
        })
        if (model) {
            next()
        } else {
            res.status(404).send(`không tìm thấy id : ${id}`)
        }
    }
}

module.exports = {
    checkExist
}