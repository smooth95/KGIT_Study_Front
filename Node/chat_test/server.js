const express = require("express");
const cookieParser = require("cookie-parser")
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require("body-parser")
const fs = require('fs');
const path = require('path');

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




var chatRooms = {};
var roomTimers = {};

io.on('connection', (socket) => {
    const resetTime = 5 * 60 * 1000; // 5분
    
    socket.on('readChatFile', (roomId, receiveId, sendId) => {

        fs.readFile(filePath, 'utf8', (err, data) => {
        const filePath = path.join(__dirname, 'public', 'chat', roomId, receiveId, sendId);
            if (err) {
                console.error('이전 채팅 내용을 읽어오는 중 오류 발생:', err);
            } else {
                previousChatMessages = data;
                console.log('이전 채팅 내용을 성공적으로 읽어왔습니다.');
            }
        });
    })



    console.log('a user connected');
    
    socket.on('connectUser', (roomId, userId) => {
        console.log("ser connectUser 실행")
        if (chatRooms[roomId] == null){
            chatRooms[roomId] = []
            console.log("방생성")
        } 
        socket.id = userId

        const result = chatRooms[roomId].find(socket => socket.id === userId);
        if (result == null) {
            chatRooms[roomId].push(socket);
        } 
        else {
            chatRooms[roomId] = chatRooms[roomId].filter(item => item.id != userId)
            chatRooms[roomId].push(socket);
        }
        chatRooms[roomId].forEach( (socket) => {
            socket.emit('userConnected', userId)
        })

        roomTimers[roomId] = setTimeout(() => {
            closeChatRoom(roomId);
        }, resetTime)
    })
    
    socket.on('chat message', (msg, roomId, receiveId, cookie) => {
        // console.log("chatRoomchk : ", chatRooms)
        // console.log("ser chat message 실행")
        console.log("cookie확인:", cookie)
        // console.log("roomId : ", roomId)
        // console.log("chatRooms상태 : ", chatRooms[roomId])
        if (chatRooms[roomId] != null){
            chatRooms[roomId].forEach( (socket) => {
                // console.log("foreach문 실행")
                // console.log("socket id : ", socket.id)
                socket.emit('chat message', msg, cookie);
            })
        }
        resetChatRoomTimer(roomId);
        saveMessageToFile(msg, roomId, receiveId, cookie)

    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    function closeChatRoom(roomId) {
        delete chatRooms[roomId];
        clearTimeout(roomTimers[roomId]);
        console.log(roomId,"번 채팅방이 삭제되었습니다.")
    }

    function resetChatRoomTimer(roomId) {
        console.log("시간 초기화")
        clearTimeout(roomTimers[roomId]);
        roomTimers[roomId] = setTimeout(() => {
            closeChatRoom(roomId);
        }, resetTime);
    }

    function saveMessageToFile(message, roomId, receiveId, sendId) {
        const timestamp = new Date().toISOString(); // 현재 시간을 ISO 형식으로 가져옴
        const folderPath = path.join(__dirname, 'public', 'chat', roomId, receiveId);

        // 폴더가 존재하지 않으면 생성
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('폴더 생성 중 오류 발생:', err);
                } else {
                    console.log('폴더 생성 완료:', folderPath);
                }
            });
        }
        
        var filePath = "";
        chatRooms[roomId].forEach(data => {
            console.log("data.id : ", data.id)
        }) // 테스트 코드

        if (receiveId == sendId) {

        } else {
            filePath = path.join(folderPath, `${sendId}.txt`);
        }
        console.log("filepath : ", filePath)
        if (!filePath) {
            console.log("filepath 없음")
        } else {
            if (fs.existsSync(filePath)) {
                fs.appendFile(filePath, `${timestamp}: ${sendId} : ${message}\n`, (err) => {
                    if (err) {
                        console.error('파일에 메시지를 저장하는 중 오류가 발생했습니다:', err);
                    } else {
                        console.log('메시지가 파일에 저장되었습니다.');
                    }
                });
            } else {
                fs.writeFile(filePath, `${timestamp}: ${message}\n`, (err) => {
                    if (err) {
                        console.error('파일에 메시지를 저장하는 중 오류가 발생했습니다:', err);
                    } else {
                        console.log('메시지가 파일에 저장되었습니다.');
                    }
                });
            }
        }
    }
});





server.listen(3000, () => {
    console.log("3000서버 구동")
})