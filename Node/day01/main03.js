const express = require("express");
const app = express();

app.set("views", "./views/");
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render('index', {key : "value"})
})
app.get("/login", (req, res) => {
    const name ="홍길동";
    res.render('login', {n : name})
})
app.get("/logout", (req, res) => {
    const context = {
        key1 : "값1",
        key2 : "값2",
        key3 : [10, 20, 30],
        key4 : {k1 : "k11", k2 : "k22"}
    }
    res.render('logout', {c : context} )
})

app.get("/if",(req, res) => {
    const num = 100;
    if (num > 100) {
        console.log("100보다 크다");
    } else if (num > 80 ) {
        console.log("80보다 크다");
    } else {
        console.log("그 외의 값");
    }
})

app.listen(3000);