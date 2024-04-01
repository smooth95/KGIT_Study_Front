const express = require('express');
const app = express();

app.set("views", "./");
app.set("view engine", "ejs");

app.get("/member", (req, res) => {
    context = {
        arr : ['홍길동','20살','산골짜기'],
        obj : {'name' : '김개똥', 'age' : '30살', 'addr' : '개똥별'},
        name : '고길동',
        'age' : '40살',
        'addr' : '마포구'
    }
    // res.render("member", {context:context})
    res.render("member", {context})
    // 키와 밸류가 같으면 하나만 써도 된다.
})

app.get ("/for", (req, res) => {
    const arr = [10,20,30];
    for (let i = 0; i < arr.length; i++ ) {
        console.log(arr[i]);
    }
    console.log("---------")
    arr.forEach( (data) => {
        console.log('foreach : ' + data)
    })
    res.render("for")
})
app.listen(3000, () => {
    console.log("연결 성공")
})