const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/cookie_session/cookie_session_config");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
config.sessionConfig.store = new fileStore();

const app = express();
app.use(session(config.sessionConfig));
app.use(bodyParser.urlencoded());

const router = require("./src/routers/router")(app)


app.set("views", "./src/views")
app.set("view engine", "ejs");

app.use("/", router)


app.listen(3000, () => {
    console.log("3000서버 실행")
})