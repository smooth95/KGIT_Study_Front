const service = require("../service/test_service");

const index = (req, res) => {
    const member = service.index();
    // console.log("controller")
    // console.log(member)
    res.render("index", {member});
}
const test1 = (req, res) => {
    console.log("===test1===")
    console.log("req.query.id : ", req.query.id)
    console.log("req.query[pwd] : ", req.query['pwd'])
    // let msg = `<script>
    //     alert('성공');
    //     location.href="/test2"
    //     </script>`;
    //     // 로그인 성공하면 다시 test2페이지로 이동
    // res.send(msg);
    // res.render("test1");
    // 새로 페이지를 만들어야해서 send방식으로 msg를 전달하면
    // 쉽게 alert창을 띄울 수 있다.
    if (req.query.id === 'aaa') {
        res.redirect("/")
    } else {
        res.redirect("/test2")
    }

}
const test2 = (req, res) => {
    res.render("test2")
}
const info = (req, res) => {
    console.log(req.param("uID"))
    const mem = service.getMember( req.param("uID"));
    res.render("info", {mem})
}
module.exports = {
    index : index,
    test1, 
    t2 : test2,
    info
};
// 키와 밸류 값으로 내보낼 수 있다.