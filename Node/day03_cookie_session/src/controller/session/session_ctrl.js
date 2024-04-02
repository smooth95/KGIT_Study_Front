const index = (req, res) => {
    res.render("session/index");
}
// 처음 접속했을때 표시되는 페이지

const setSession = (req, res) => {
    req.session.name = "홍길동";
    req.session.age = 20;
    res.render("session/set_session")
}
// 처음 페이지에서 href를 걸어두었고 클릭했을경우 실행되는 페이지
// session값 name과 age를 셋팅한다.

const getSession = (req, res) => {
    const sessionValue = { 
        name : req.session.name, 
        age : req.session.age 
    }
    res.render("session/get_session", sessionValue)
}
// set_session 후 클릭하면 name값과 age값을 받아올 수 있다.

const delSession = (req, res) => {
    // delete req.session.name;
    // 특정 세션 하나 삭제
    req.session.destroy();
    // 모든 세션 삭제

    res.render("session/del_session")
}
// session 값을 삭제한다. 특정값을 삭제할수도있고 전체를 삭제할수도 있다.

const login = (req, res) => {
    res.render("session/login", {username : req.session.username})
}
// /login으로 접속시 보여지는 페이지
// login.ejs파일을 띄우며 username값을 가지고 넘어간다.
// 넘어간 후 if문을 통해 비교하여 페이지를 표시한다.

const db = require("../../db/session/session_mem")
// 간단하게 만든 데이터를 불러온다.

const loginCheck = (req, res) => {
    const member = db.filter( 
            (mem) => mem.id === req.body.id && mem.pwd === req.body.pwd 
        )
        if (member.length != 0) {
            req.session.username = member[0].id;
            req.session.nick = member[0].nick;
    
            req.session.save(() => {
                res.redirect("/session/success")
            })
        } else {
            let msg = scriptMsg("로그인 실패", "/session/login")
            res.send(msg)
        }
}
// 로그인할때 입력한 id와 pwd값과 db에 있는 값을 비교하여 해당 사용자의 정보를 불러온다.
// 사용자가 존재할 경우 해당 정보를 기반으로 session을 생성한다.
// save -> 세션을 파일에 저장 후 페이지를 리다이렉트한다.
// 사용자가 존재하지 않을 경우 scriptMsg함수를 사용하여 로그인 실패 alert창을 띄우고
// login페이지로 리다이렉트한다.

const loginCheck1 = (req, res) => {
    console.log("locincheckusername: " , req.session.username)
    // console.log(req.query)
    // console.log(req.query.id)
    // console.log(req.query['pwd'])
    // get방식 정보 확인
    console.log(req.body)
    console.log(req.body.id)
    console.log(req.body['pwd'])
    // post 방식으로 넘어온 데이터를 확인할 수 있다.
    
    const DBId = "aaa", DBPwd = "aaa", DBNick = "홍길동";
    if (DBId === req.body.id && DBPwd === req.body.pwd) {
        req.session.username = DBId;
        req.session.nick = DBNick;

        req.session.save(() => {
            res.redirect("/session/success")
        })

        // return res.redirect("/session/success")
        
        // msg = scriptMsg("로그인성공", "/session/success")
    } else {
        let msg = scriptMsg("로그인 실패", "/session/login")
        res.send(msg)
    }
    // res.send(msg)

    // let msg = scriptMsg("로그인 실패", "/session/login")
    // res.send(msg)
}
// 해당 함수는 db에 값을 추가하기 전에 사용되던 함수
// DBId값과 DBPwd값을 비교하여 맞으면 세션을 생성하는 코드이다.

const scriptMsg = (sMsg, sUrl) => {
    return `<script>
        alert("${sMsg}");
        location.href="${sUrl}";
        </script>`
}

const success = (req, res) => {
    console.log("success에서 : " , req.session.username)
    if (req.session.username)
        return res.render("session/success", {nick : req.session.nick})
    let msg = scriptMsg("로그인 먼저 하세요", "/session/login")
    res.send(msg)
}
// 로그인이 성공했을 경우 success페이지로 넘어가며 nick 정보를 포함한다.
// 로그인이 실패했을 경우(username이 undefine일경우) alert를 띄워주고 리다이렉트한다.

const logout = (req, res) => {
    req.session.destroy( () => {
        console.log("모든 세션을 만료합니다.")
    } );
    // 내부에 콜백함수 사용 가능
    res.redirect("/session/login")
}
// 로그아웃을 시도할 경우 해당 세션을 삭제하고 login페이지로 리다이렉트한다.

module.exports = {
    index,
    setSession,
    getSession,
    delSession,
    login,
    loginCheck,
    success,
    logout,
}