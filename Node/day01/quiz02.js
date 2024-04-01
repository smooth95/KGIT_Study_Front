const express = require('express');
const app = express();

app.set("views", "./");
app.set("view engine", "ejs");

app.get("/for_quiz", (req, res) => {
    context = {
        "rank" : [
            [1,2,3,4,5],
            ['육','7','팔','구',10],
            [11,12,13,14,15]
        ]
    }
    res.render("for_quiz", {context})
})

app.listen(3000);