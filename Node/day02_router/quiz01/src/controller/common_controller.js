const service = require("../service/member/memberService")
const index = (req, res) => {
    res.render("index")
}
const memLogin = (req, res) => {
    res.render("./member/login")
}
const clickLogin = (req, res) => {

}
const memList = (req, res) => {
    console.log("req query : " + req.query.id)
    const memChk = service.memberCheck(req.query);
    console.log("memChk : " + memChk)
    if (memChk == 1) {
        const mem = service.getMember();
        res.render("./member/list", {mem})
    } else {
        res.redirect("/")
    }
}
const memInfo = (req, res) => {
    const mem = service.memInfo(req.query.uID);
    console.log(mem)
    res.render("./member/info", {mem})
}


module.exports = {
    index : index,
    memLogin,
    memList,
    memInfo
}