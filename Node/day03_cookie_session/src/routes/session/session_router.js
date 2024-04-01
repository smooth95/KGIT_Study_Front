const express = require("express");
const ctrl = require("../../controller/session/session_ctrl");
const router = express.Router();

router.get("/", ctrl.index);

module.exports = router;