const ser = require("../../service/member/member_service");





const list = async (req, res) => {
    const list = await ser.getList();
    console.log("list : ", list);
    // res.send( list );
    res.render("member/member_index", { list })

    // let con = await oracledb.getConnection( dbConfig );
    // console.log("con : " , con)
    // // let result = await con.execute("select * from members");
    // let result = con.execute("select * from members");
    // result.then(res => console.log("res : ", res))
    // console.log("result", result)

    // res.send("list")

}

const registerForm = (req, res) => {
    res.render("member/register_form")
}

const register = async (req, res) => {
    let msg = await ser.insert(req.body);
    res.send( msg )
}

const memberView01 = async (req, res) => {
    console.log(" === view 01 ===")
    console.log("req .params", req.params )
    console.log("req .query", req.query )
    let member = await ser.getMember(req.params)
    res.render("member/member_view", { member })
}

const memberView02 = async (req, res) => {
    console.log(" === view 02 ===")
    console.log("req .params", req.params )
    console.log("req .query", req.query )
    let member = await ser.getMember(req.query)
    res.render("member/member_view", { member })
}

const deleteM = async (req, res) => {
    let msg = await ser.deleteM(req.params);
    console.log("params : " ,req.params)
    res.send(msg)
}

const modifyForm = async (req, res) => {
    console.log("req.query : ", req.query)
    let member = await ser.getMember(req.query);
    res.render("member/modify_form", { member })
}

const modify = async (req, res) => {
    let msg = await ser.modify( req.body );
    res.send( msg );
}

module.exports = {
    list,
    registerForm,
    register,
    memberView01,
    memberView02,
    deleteM,
    modifyForm,
    modify,
}