module.exports = (app) => {
    const chatRouter = require("./chat/chat_router")(app)
    const router = require("express").Router();
    app.use("/chat", chatRouter);

    router.get("/", (req, res) => {
        res.render("index")
    })
    return router;
}