const express = require('express');
const router = require("./src/routes/common_router");

const app = express();

app.set("views", "./src/views/")
app.set("view engine", "ejs");

app.use("/", router);



app.listen(3000, () => {
    console.log("3000서버 실행")
})