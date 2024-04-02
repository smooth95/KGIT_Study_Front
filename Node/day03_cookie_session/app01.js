const express = require("express");
const cookieRouter = require("./src/routes/cookie/cookie_router");
const cookieParser = require("cookie-parser");
const config = require("./config/cookie_session/config");
const sessionRouter = require("./src/routes/session/session_router");
const session = require("express-session");
// 세션 기능을 사용하기 위해 기능을 가져온다.
const bodyParser = require("body-parser")
// 포스트 방식을 사용할 경우 필요한 모듈을 불러온다.
const fileStore = require("session-file-store")(session);
// const sessionConfig = require("./config/cookie_session/config")
config.sessionConfig.store = new fileStore();




const app = express();
app.set("views", "./src/view");
app.set("view engine", "ejs");
// app.use( cookieParser("아무값이나키로설정") );
app.use(session(config.sessionConfig))

app.use( cookieParser() );
app.use("/cookie", cookieRouter);
// router로 보내기 전에 cookie를 설정해야한다

app.use(bodyParser.urlencoded({extended : false}))
// true를 입력시 쿼리 셀렉터를 사용(웹에서 ?표시 사용) 기본적으로 false를 사용하는것같다.
app.use("/session", sessionRouter);
// /session으로 접근할 경우 sessionRouter로 연결한다.



app.listen(3000, () => {
    console.log("3000 service");
})