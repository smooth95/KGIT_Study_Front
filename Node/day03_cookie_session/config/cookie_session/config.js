const cookieConfig = {
    httpOnly : true,
    // 웹 통신할 때 사용하겠다..
    maxAge : 5000,
    // 쿠키 유지 시간 1/1000초
    // signed : true,
}

const sessionConfig = {
    secret : "암호화 키",
    // secret는 무조껀 넣어줘야한다.
    resave : false,
    saveUnintialized : true
    // 모두 기본값처럼 사용되는 옵션들이다.
}

module.exports = { 
    cookieConfig,
    sessionConfig
} 