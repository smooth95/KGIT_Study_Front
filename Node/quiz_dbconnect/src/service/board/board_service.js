const boardDAO = require("../../database/board/board_dao")

const boardList = async () => {
    const result = await boardDAO.getList();
    return result;
}



module.exports = {
    boardList,
}