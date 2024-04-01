const express = require('express');
const app = express();

app.set("views", "./")
app.set("view engine", "ejs");
// 보여지는 기능으로 ejs 템플릿 사용

app.get("/", (req, res) => {
    // res.send("기본 페이지");
    res.render('index');
    // index파일을 사용자에게 보여주겠다. (index.ejs)
})
app.get("/test", (req, res) => {
    res.send("테스트 페이지");
})

app.listen(3000, () => {
    console.log("3000포트 서버 구동")
});