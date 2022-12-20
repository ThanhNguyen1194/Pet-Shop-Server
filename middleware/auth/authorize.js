const authorize = (arrType) => {
    return (req, res, next) => {
        const { user } = req
        // console.log(user)
        if (arrType.findIndex(ele => ele === user.type) !== -1) {
            next()
        } else {
            res.status(403).send("bạn không có quyền admin")
        }
    }
}

module.exports = {
    authorize
}