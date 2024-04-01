const express = require("express");
const router = express.Router();
const ctrl = require("../controller/test_controller")
// 컨트롤러로부터 함수를 받아올 수 있다.

// router.get("/",(req, res) => {
//     res.send("router 분할")
// })

router.get("/", ctrl.index)
router.get("/test1", ctrl.test1)
router.get("/test2", ctrl.t2)
// 받은 키와 밸류 값을 사용하여 컨트롤러를 연결할 수 있다.
router.get("/info", ctrl.info)
module.exports = router;