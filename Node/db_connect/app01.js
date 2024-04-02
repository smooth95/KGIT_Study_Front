const express = require("express");
const app = express();
let con;
app.get("/", (req, res) => {
    console.log("1.연동 전..")
    con = connect();
    con.then( msg => {
        console.log("3.연동 완료후 특정 기능 사용..")
        res.send("msg : " + msg)
    })
    // promise에서 사용되는 resolve값이 msg로 대입되며 값을 적용한다.
    
})
const connect = () => {
    let msg;
    return new Promise( (resolve) => {
        // 비동기로 동작하는 값을 보장하는 함수(Promise) 값을 꺼내기위해 then기능을 사용한다.
        setTimeout(() => {
            msg = "연동 되었습니다.";
            console.log("2.연동 하는 중.....");
            resolve(msg);
        }, 1000);
        // 자기자신 호출, 1초마다 자기자신 호출
        // 1초뒤부터 1초마다 
    } );
    // 쓸 일 없음

    // return msg;

    // msg = "연동 되었습니다.";
    // console.log("2. 연동 하는 중.....");
    // return msg;
}

app.get("/async", async (req, res) => {
    // 비동기로 동작하는 함수가 있을경우 async를 적용한다.
    console.log("1111 연동전 async");
    con = await connect();
    // 결과값을 받을때까지 기다린다.
    console.log("3333 받아온 객체 연산 async");
    res.send("con : " + con)
})


const oracleDB = require("oracledb")
const dbConfig = {
    user : "c##java",
    password : "1234",
    connectString : "localhost:1521/orcl",
}
app.get("/connect", async (req, res) => {
    let con = await oracleDB.getConnection( dbConfig );
    console.log("con : ", con)
    let con1 = oracleDB.getConnection( dbConfig );

    con1.then ( res => {
        console.log("res : " , res);
    })
    console.log("con1 : " + con1)
    res.send("con : " + con)
    // db연동을 위해 async + await 방식을 사용하거나 
    // promise + then을 사용하여 값을 얻어올 수 있다.
})




app.listen(3000, () => {
    console.log("3000")
})