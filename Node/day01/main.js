
const http = require('http');
const fs = require("fs");
// nodejs 에서만 사용가능한 기능
// 파일 시스템 관련
// 기능을 가지고 오기위해 사용
const app = http.createServer( (req, res) => {
    // request, response 의 기능을 하는 변수를 선언
    console.log("연결 성공!!!")
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    if (req.url === "/") {
        // 사용자가 포트까지만 입력했을때
        res.end("기본 페이지 연결")
    } else if(req.url === "/test") {
        // 사용자가 포트입력 후 페이지까지 입력했을경우
        fs.readFile("./test.html", (err, data) => {
            res.end(data)
        })
        
    } else {
        res.end("연결 성공 되었습니다.!!!");
    }
    // 200 -> 성공적인 통신이 되었다는 상태 코드, 
    // html형식이라는 내용을 전달하고 문자형식은 utf-8버전이라는 것을 전달.
    // res.end("연결 성공 되었습니다.!!!");
})
// http통신을 위한 서버 생성
app.listen(3000, "192.168.42.115");
// 포트 3000번 포트를 사용 / 아이피를 입력하여 아이피로 접근할 수 있다.
// 리스너 => 연결 대기
