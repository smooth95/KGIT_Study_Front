module.exports = ( app ) => {
    const memberRouter = require("./member/member_router");
    const boardRouter = require("./board/board_router")
    app.use("/member", memberRouter);
    app.use("/board", boardRouter)

    const router = require("express").Router();

    router.get("/", (req, res) => {
        res.render("index", {req});
    })
    return router;
}