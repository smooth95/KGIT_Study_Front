const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded());

const router = require("./src/routers/router")(app)
// 뒤의 괄호는 router페이지로 app을 전달한다는 의미
app.use("/", router);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("3000서버 동작")
})