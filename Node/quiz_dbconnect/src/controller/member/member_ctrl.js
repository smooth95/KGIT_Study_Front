const ser = require("../../service/member/member_service");

const memberLogin = (req, res) => {
    console.log("sessionname : " ,req.session.name)
    res.render("member/login", {req})
}

const loginCheck = async (req, res) => {
    const result = await ser.loginCheck(req.query);
    console.log(req.query.id)
    console.log("result : ", result.code)
    if (result.code == 0) {
        req.session.name = req.query.id;
    }
    res.send(result.msgPack)
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
}

const memberView = async (req, res) => {
    console.log("session name : ", req.session.name);
    const member = await ser.memberView(req.session.name)
    res.render("member/member_view", { member, req })
}

const registerForm = async (req, res) => {
    res.render("member/register_form")
}

const register = async (req, res) => {
    const result = ser.register(req.query)
    if (result == 1 ) {
        res.send(`
            <script>
                alert("회원가입 완료")
                location.href = "member/login"
            </script>
        `)
    } else {
        res.send(`
            <script>
                alert("회원가입 실패, 아이디를 확인하세요")
                location.href = "register_form"
            </script>
        `)
    }
}

module.exports = {
    memberLogin,
    loginCheck,
    logout,
    memberView,
    registerForm,
    register,
}