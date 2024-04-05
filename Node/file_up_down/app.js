const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded())
app.use("/static", express.static("./public"))
// 외부 파일(js파일)사용할때 경로로 사용하는 기능 (public 을 static이라는 이름으로 사용한다.)

const router = require("./src/routers/router")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", router)


app.listen(3000, () => {
    console.log("3000서버 실행")
})