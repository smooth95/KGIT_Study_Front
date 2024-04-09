const ser = require("../../service/board/board_service")

const view = {
    list : async (req, res) => {
        const list = await ser.boardList();
        res.render("board/list", {req, list : list.rows})
    }
}
const process = {

}



module.exports = {view, process}