module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    const chatCtrl = require("../../controller/chat/chat_controller");

    // Socket.IO 객체를 컨트롤러로 전달
    router.get("/", chatCtrl.chat_view.index);
    router.get("/info/:id/:num", chatCtrl.chat_view.info);
    router.get("/login_form", chatCtrl.chat_view.chatLoginForm);
    router.post("/login", chatCtrl.chat_process.loginChk);

    return router;
};

