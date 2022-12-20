const express = require("express")
const path = require("path")
const cors = require("cors")
const { sequelize } = require("./models/index")
const { rootRouter } = require("./routers/index")


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
// });

app.use(express.json())
//static folder
const publicPathDirectory = path.join(__dirname, "./public")
app.use("/public", express.static(publicPathDirectory))
//dùng router
app.use("/api/v1", rootRouter)
//lắng nghe kết nối
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})