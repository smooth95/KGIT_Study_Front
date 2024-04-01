const member = require("../../database/member/memberDAO")

const getMember = () => {
    return member;
}

const memberCheck = (req) => {
    console.log(req.id);
    console.log(member);
    const mem = member.filter((d) => d.id === req.id)
    console.log("mem : " + mem[0])
    if (mem != "") {
        return 1;
    } else {
        return 0;
    }
}
const memInfo = (req) => {
    console.log("req : " + req)
    const mem = member.filter((d) => d.id === req)
    return mem;
}
module.exports = {
    getMember,
    memberCheck,
    memInfo
}

