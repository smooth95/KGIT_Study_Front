const router = require("express").Router();
const ctrl = require("../../controller/member/member_ctrl")

router.get("/login", ctrl.memberLogin)
router.get("/login_check", ctrl.loginCheck)
router.get("/logout", ctrl.logout)
router.get("/member_view", ctrl.memberView)
router.get("/register_form", ctrl.registerForm)
router.get("/register", ctrl.register)

module.exports = router;
