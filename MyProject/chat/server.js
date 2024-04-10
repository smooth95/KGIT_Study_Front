const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const path = require("path");
const cookieParser = require("cookie-parser")

const app = express();
const server = http.createServer(app);
const io = SocketIO(server)

app.use(cookieParser())

app.set("views", "./view");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")))

let nextUserId = 1000;

app.get("/", (req, res) => {
    let userId = req.cookies.userId;
    if (!userId) {
        userId = nextUserId++;
        res.cookie("userId", userId)
    }
    res.render("index")
})

io.on("connection", (socket) => {
    console.log("User connected");

    let userId = socket.handshake.cookies.userId;

    socket.emit("set user id", userId)
    
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })


    socket.on("chat message", (msg) => {
        var nickname = socket.nickname || 'Anonymous'; // 닉네임이 없으면 'Anonymous'로 설정
        io.emit("chat message", `${nickname}(${userId}): ${msg}`)
    })

    socket.on('set nickname', function(nickname) {
        socket.nickname = nickname; // 소켓에 닉네임을 저장합니다.
    });

    io.emit("chat message", "User connected")
})

server.listen(3000, () => {
    console.log("3000 서버 실행")
})

