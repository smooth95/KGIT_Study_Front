module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    const chatCtrl = require("../../controller/chat/chat_controller");

    // Socket.IO 객체를 컨트롤러로 전달
    router.get("/", chatCtrl.chat_view.index);
    router.get("/login_form", chatCtrl.chat_view.chatLoginForm);
    router.post("/login", chatCtrl.chat_process.loginChk);

    return router;
};


// const chatRouter = (app, io) => {
//     const router = require("express").Router();
//     const chatCtrl = require("../../controller/chat/chat_controller")
//     router.get("/", chatCtrl.chat_view.index)
//     router.get("/login_form", chatCtrl.chat_view.chatLoginForm);
//     router.post("/login", chatCtrl.chat_process.loginChk);
    
//     return router;
// }
    

// module.exports = chatRouter;




    
// io.on('connection', (socket) => {
//     console.log('a user connected');
    
//     // 클라이언트로부터 받은 메시지를 다시 클라이언트로 브로드캐스트
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
    
//     // 클라이언트 연결 종료 시 로그 출력
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });
