const express = require('express');
const router = require('./routes/test_router')

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

//const router = express.Router();
app.use("/", router)
// /로시작하는 요청을 받으면 require로 전달받은 router로 연결한다.

app.listen(3000, () => console.log("3000 서버 실행"))