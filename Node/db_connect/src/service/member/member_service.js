const memberDAO = require("../../database/member/member_dao");
const bcrypt = require("bcrypt");

const getList = async () => {
    const result = await memberDAO.getList();
    console.log("service : ", result)
    return result;
}

const insert = async (body) => {
    console.log("service body : ", body)
    body.pwd = bcrypt.hashSync(body.pwd, 10);
    const result = await memberDAO.insert(body);
    let msg = "", url = "";
    console.log("result : " ,result)
    if (result == 0) {
        msg = "문제 발생";
        url = "/member/register_form"
    } else {
        msg = "회원가입 성공";
        url = "/member/list"
    }
    let msgPack = getMessage(msg, url);
    return msgPack
}


const getMessage = (msg, url) => {
    return `
        <script>
            alert("${msg}");
            location.href = "${url}";
        </script>
    `
}

const getMember = async (mID ) => {
    const member = await memberDAO.getMember(mID);
    return member;
}

const deleteM = async(body) => {
    const result = await memberDAO.deleteM(body);
    let msg = "", url = "";
    if (result == 0) {
        msg = "문제 발생"
        url = `/member/member_view/${body.id}`;
    } else {
        msg = "삭제되었습니다."
        url = "/member/list"
    }
    return getMessage(msg, url);
}

const modify = async( body ) => {
    const result = await memberDAO.modify(body);
    let msg = "", url = "";
    if (result == 0) {
        msg = "문제 발생"
        url = `/member/modify_form?id=${body.id}`;
    } else {
        msg = "변경되었습니다."
        url = `/member/member_view/${body.id}`
    }
    return getMessage(msg, url);
}


module.exports = {
    getList,
    insert,
    getMember,
    deleteM,
    modify,
}