const db = require("../../database/member/member_dao");

const loginCheck = async (body) => {
    body.pwd
    const result = await db.loginCheck(body.id);
    let msg = "";
    let url = "";
    let code;
    if (result.PWD === body.pwd) {
        msg = `${result.NAME} 님 환영합니다.`
        url = "/"
        code = 0;
    } else {
        msg = "로그인 실패"
        url = "/member/login"
        code = -1;
    }
    let msgPack = getMessage(msg, url);
    return {msgPack, code};
}

const getMessage = (msg, url) => {
    return `
        <script>
            alert("${msg}");
            location.href = "${url}";
        </script>
    `
}

const memberView = async ( req ) => {
    console.log("req : ", req)
    const member = await db.memberInfo(req)
    return member;
}

const register = async ( req ) => {
    const result = await db.register(req);
    return result;
}

module.exports = {
    loginCheck,
    memberView,
    register,
}