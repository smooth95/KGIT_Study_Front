const express = require("express");
const app = express();


app.set("views", __dirname+"/views")
app.set("view engine", "ejs");

let = members = [
    {id : "aaa", pwd : "aaa", name : "홍길동", addr : "길동네"},
    {id : "bbb", pwd : "bbb", name : "비길동", addr : "비길동네"},
    {id : "ccc", pwd : "ccc", name : "씨길동", addr : "씨길동네"},
    {id : "ddd", pwd : "ddd", name : "디길동", addr : "디길동네"},
    {id : "eee", pwd : "aaa", name : "홍길동", addr : "길동네"},
    {id : "fff", pwd : "bbb", name : "비길동", addr : "비길동네"},
    {id : "ggg", pwd : "ccc", name : "씨길동", addr : "씨길동네"},
    {id : "hhh", pwd : "ddd", name : "디길동", addr : "디길동네"},
    {id : "iii", pwd : "aaa", name : "홍길동", addr : "길동네"},
    {id : "jjj", pwd : "bbb", name : "비길동", addr : "비길동네"},
    {id : "kkk", pwd : "ccc", name : "씨길동", addr : "씨길동네"},
    {id : "lll", pwd : "ddd", name : "디길동", addr : "디길동네"},
]

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/get_members", (req, res) => {
    res.json(members)
})

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.post("/register", (req, res) => {
    console.log("req.body : ", req.body)
    members = members.concat(req.body);
    res.json(1);
})

app.get("/search/:id", (req, res) => {
    console.log(req.params);
    const result = members.filter(mem => mem.id === req.params.id);
    console.log("result : ", result)
    res.json(result[0])
})

app.put("/modify", (req, res) => {
    members = members.filter(mem => mem.id !== req.body.id)
    members = members.concat(req.body);
    res.json(1);
})

app.delete("/delete", (req, res) => {
    members = members.filter(mem => mem.id !== req.body.id)
    res.json(1);
})

app.get("/idChk/:id", (req, res) => {
    console.log("params: " , req.params.id)
    const result = members.filter(mem => mem.id === req.params.id);
    if (result != "") {
        console.log("result : ", result)
        res.json(result[0])
    } else {
        res.json(0)
    }
})


app.get("/view_member", (req, res) => {
    res.render("view_member")
})

let cnt = 0;
app.get("/view_member/more", (req, res) => {
    console.log("viewmember/more실행")
    let count = cnt + 3;
    const result = [];
    console.log(members[cnt])
    for ( ; cnt < count; cnt++) {
        result.push(members[cnt])
    }
    console.log("result : ", result)
    res.json(result)
})


app.listen(3000, () => {
    console.log("3000서버 실행")
})
