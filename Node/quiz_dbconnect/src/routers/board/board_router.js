const router = require("express").Router();
const ctrl = require("../../controller/board/board_ctrl")

router.get("/list", ctrl.view.list)

module.exports = router;