const service = require("../../service/chat/chat_service")
const cookieConfig = require("../../../config/cookie_session/config")

const chat_view = {
    index : (req, res) => {
        res.render("chat/chat_index", { cookie : req.cookies.chatID })
    },
    chatLoginForm : (req, res) => {
        res.render("chat/chat_login_form")
    }
}
const chat_process = {
    loginChk : (req, res) => {
        console.log("body : ", req.body)
        const result = service.process.loginChk(req.body);
        console.log("result : ", result);
        if (result.length != 0) {
            res.cookie("chatID", req.body.id, cookieConfig )
            res.cookie("chatPW", req.body.pwd, cookieConfig)
            res.cookie("isLogin", "true", cookieConfig)
            msg = "로그인 성공 하였습니다."
            url = "/chat"
        } else {
            msg = "아이디 확인 필요",
            url = "/chat/login_form"
        }
        res.send (service.getMessage(msg, url))
    }
}






module.exports = {
    chat_view,
    chat_process,
}