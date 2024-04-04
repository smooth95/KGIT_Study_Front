const sessionConfig = {
    secret : "암호화 키",
    // secret는 무조껀 넣어줘야한다.
    resave : false,
    saveUnintialized : true,
    // 모두 기본값처럼 사용되는 옵션들이다.
    // cookie : {maxAge : 5000}
    // 세션을 5초동안 유지하겠다. 기본 세션 유지 시간은 30분
}

module.exports = { 
    sessionConfig
} 