const ser = require("../../service/board/board_reply_service")

const rep_process = {
    register : async (req, res) => {
        const result = await ser.repInsert.register(req.body);
        res.json(result);
    }
}

const rep_views = {
    replyData : async (req, res) => {
        const result = await ser.repRead.replyData(req.params.groupNum);
        res.json(result);
    }
}

module.exports = {
    rep_process,
    rep_views
}