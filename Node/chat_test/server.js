const express = require("express");
const cookieParser = require("cookie-parser")
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require("body-parser")

const app = express();

const server = http.createServer(app);
const io = socketIO(server);


app.use(bodyParser.urlencoded());
app.use("/static", express.static("./public"))
app.use(express.static(__dirname + '/public'));
app.use( cookieParser() );


const router = require("./src/routers/router")(app, io)
app.use("/", router);

app.set("views", "./src/views")
app.set("view engine", "ejs")





io.on('connection', (socket) => {
    console.log('a user connected');
    
    // 클라이언트로부터 받은 메시지를 다시 클라이언트로 브로드캐스트
    socket.on('chat message', (msg, cookie) => {
        console.log("cookie : ", cookie)
        io.emit('chat message', msg, cookie);
    });
    
    // 클라이언트 연결 종료 시 로그 출력
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});





server.listen(3000, () => {
    console.log("3000서버 구동")
})