module.exports = ( app ) => {
    const memberRouter = require("./member/member_router");
    app.use("/member", memberRouter);

    const router = require("express").Router();

    router.get("/", (req, res) => {
        res.render("index");
    })

    return router;
}
// 전달받은 app을 받아옴

