const router = require("express").Router();

const multer = require("multer");
// multipart 로 파일을 받아올때 사용할 모듈 불러오기
// const upload = multer({dest : "upload_file"})
// 파일이 저장될 목적지 설정(폴더)
const stg = multer.diskStorage({
    destination : (req, file, cb) => {
        // cb는 콜백함수, 파일이 들어왔을때 실행할 함수
        console.log("req : ", req.body)
        console.log("file : ", file)
        console.log("cb : ", cb)
        cb(null, "upload_file")
        // 파일을 저장할 위치 설정
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
        // 파일이름을 원본 이름으로 저장
        // 파일 이름 중복을 방지하기위해 시간을 붙여서 저장한다.
    }
})
const f_filter = (req, file, cb) => {
    console.log("f_filter file : ", file.mimetype.split("/"))
    // mimetype값을 / 기준으로 분할한다.

    const type = file.mimetype.split("/");
    if (type[1] == "jpg" || type[1] == "jpeg" || type[1] == "png") {
        cb(null, true);
    } else {
        req.fileValidation = "이미지만 저장하세요";
        cb(null, false);
    }
}
// 특정 파일만 저장할 수 있도록 설정

// 저장 할때 사용될 옵션값들을 설정한다.
const upload = multer({storage : stg, fileFilter : f_filter});
const fileCtrl = require("../controller/file_controller");


router.get("/", fileCtrl.view.index);
router.post("/upload", upload.single("file_name"), fileCtrl.process.upload);
router.get("/list", fileCtrl.view.list);
router.get("/download/:fileName", fileCtrl.view.download);
router.get("/delete/:fileName", fileCtrl.process.delete);
router.get("/modify_form/:fileName", fileCtrl.view.modifyForm);
router.post("/modify", upload.single("newFileName"), fileCtrl.process.modify);

// router.post("/upload", upload.single("file_name"), fileCtrl.process.upload);
// 서비스로 연결하기 전에 파일옵션을 먼저 넣어야한다. (file_index.ejs파일의 file타입 name)



module.exports = router;