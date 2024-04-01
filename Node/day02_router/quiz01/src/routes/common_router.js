const express = require('express');
const router = express.Router();
const ctrl = require("../controller/common_controller");

router.get("/", ctrl.index);
router.get("/member/login", ctrl.memLogin)
router.get("/member/list", ctrl.memList)
router.get("/member/info", ctrl.memInfo)

module.exports = router;