const express = require("express");
const cookieRouter = require("./src/routes/cookie/cookie_router");
const cookieParser = require("cookie-parser");
const config = require("./config/cookie_session/config");
const sessionRouter = require("./src/routes/session/session_router");
const session = require("express-session");



const app = express();
app.set("views", "./src/view");
app.set("view engine", "ejs");
// app.use( cookieParser("아무값이나키로설정") );
app.use( cookieParser() );
app.use("/cookie", cookieRouter);

app.use(session(config.sessionConfig))
app.use("/session", sessionRouter);
// router로 보내기 전에 cookie를 설정해야한다

app.listen(3000, () => {
    console.log("3000 service");
})