const express = require('express');
const DBMember = require('./db/memberDAO');
// 내보낸 파일 불러오기

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

const router = express.Router();
app.use("/", router)
// /로 접근하면 router로 연결

router.get("/", (req, res) => {
    console.log("router로 연결")
    console.log(DBMember)
    res.render("index");
})

const router2 = express.Router();
app.use("/member", router2)

router2.get("/", (req, res) => {
    
    res.send("member 기본 페이지 입니다.");
})
router2.get("/list", (req, res) => {
    res.send("member 의 목록을 보여줍니다.");
})

// app.get("/", (req, res) => {
//     res.render("index");
// })
app.listen(3000, () => console.log("3000 서버 실행"))