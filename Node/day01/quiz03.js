const express = require('express');
const app = express();

app.set("views", "./");
app.set("view engine", "ejs");

app.get("/url", (req, res) => {
    context = {
        url : [
            {"네이버" : "https://www.naver.com/"},
            {"구글" : "https://www.google.co.kr"},
            {"다음" : "https://www.daum.net/"}
        ]
    }
    res.render("url", {context})
})



app.listen(3000)