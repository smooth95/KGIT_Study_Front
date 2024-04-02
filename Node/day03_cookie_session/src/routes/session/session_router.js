const express = require("express");
const ctrl = require("../../controller/session/session_ctrl");
const router = express.Router();

router.get("/", ctrl.index);
router.get("/set_session", ctrl.setSession);
router.get("/get_session", ctrl.getSession);
router.get("/del_session", ctrl.delSession);
/*
    a href : get
    location.href : get
    method : get
*/
router.get("/login", ctrl.login);
router.post("/login_check", ctrl.loginCheck);
router.get("/success", ctrl.success);
router.get("/logout", ctrl.logout);
// method에 post를 입력하지 않으면 모두 get방식으로 구동된다.

module.exports = router;