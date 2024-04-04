const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
// 데이터를 받아왔을때의 자료 형식 / 설정하지 않을경우 배열형식, (2차원배열)

const getList = async () => {
    let con = await oracledb.getConnection( dbConfig );
    console.log("dao con : " , con)
    let result = await con.execute("select * from members");
    console.log("result", result)
    return result.rows;
}

const insert = async (body) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `insert into members(id, pwd, name, addr) 
        values(:id, :pwd, :name, :addr)`;
    let result = 0;
    try {
        result = await con.execute(sql, body);
    } catch (err) {
        console.log(err)
    }
    console.log("result : ", result)
    return result;
}

const getMember = async (mID) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `select * from members where id=:id`;
    let member ;
    try {
        member = await con.execute(sql, mID);
    } catch (err) {
        console.log(err)
    }
    return member.rows[0];
}

const deleteM = async (body) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `delete from members where id=:id`;
    let result = 0;
    try {
        result = await con.execute(sql, body)
    } catch (err) {
        console.log(err)
    }
    return result;
}

const modify = async (body) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `update members set pwd='${body.pwd}',
        name='${body.name}', addr='${body.addr}' where id = '${body.id}'`;
    let result = 0;
    try {
        result = await con.execute(sql)
    } catch (err) {
        console.log(err)
    }
    return result;
}




module.exports = {
    getList,
    insert,
    getMember,
    deleteM,
    modify,
}