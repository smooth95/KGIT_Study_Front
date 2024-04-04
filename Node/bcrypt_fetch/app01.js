const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const pwd = "test";
    // const changePwd = bcrypt.hash(pwd, 10);
    // // hash => 비동기, hashSync -> 동기
    // console.log(changePwd);
    // changePwd.then(res => console.log(res))
    
    const changePwd = bcrypt.hashSync("test", 10);
    console.log(changePwd);

    const result = bcrypt.compareSync(pwd, changePwd);
    console.log(result)

    res.send("/경로");
})



app.listen(3000, () => {
    console.log("3000서버 실행")
})
