const router = require("express").Router();
const boardCtrl = require("../../controller/board/board_ctrl")
const upload = require("../../../config/file/file_config")
router.post("/write", upload.single("image_file_name"),
                            boardCtrl.board_process.write);
router.get("/data/delete/:writeNo/:imgName", boardCtrl.board_process.delete)

router.get("/list", boardCtrl.board_view.list);
router.get("/write_form", boardCtrl.board_view.writeForm);
router.get("/data/:num", boardCtrl.board_view.data);
router.get("/modify_form/:writeNo/", boardCtrl.board_view.modifyForm)

router.get("/data/download/:imgName", boardCtrl.file_process.download)

router.post("/modify", upload.single('image_file_name'),
                        boardCtrl.board_process.modify)




module.exports = router;