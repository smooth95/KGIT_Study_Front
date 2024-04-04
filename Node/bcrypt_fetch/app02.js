const express = require("express");
const app = express();

console.log("dirname : ", __dirname)
// 현재 파일이 속해있는 경로를 표시함

app.set("views", __dirname+"/views")
app.set("view engine", "ejs");
let count = 0;
app.get("/non_fetch", (req, res) => {
    console.log("non_fetch 연동")
    count++;
    res.render("non_fetch", {count})
})

app.get("/fetch01", (req, res) => {
    console.log("fetch01 : ", count++);
    res.render("fetch01", {count});
})

app.get("/get_count", (req, res) => {
    console.log("get_count : ", count++);
    // res.render("fetch01", {count});
    res.json({ cnt : count })
})

/*
    get : 데이터를 얻어올때
    post : 데이터를 추가할때
    put : 수정
    delete : 삭제
*/

app.get("/rest", (req, res) => {
    res.render("rest")
})

app.get("/test", (req, res) => {
    res.json("get 데이터 요청할 때!!!")
})

app.post("/test", (req, res) => {
    res.json("post 데이터 추가할 때!!!")
})

app.put("/test", (req, res) => {
    res.json("put 데이터 수정할 때!!!")
})

app.delete("/test", (req, res) => {
    res.json("delete 데이터 삭제할 때!!!")
})


app.listen(3000, () => {
    console.log("3000서버 실행")
})
