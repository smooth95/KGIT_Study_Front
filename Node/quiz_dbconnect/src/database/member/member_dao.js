const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const loginCheck = async ( body ) => {
    let con = await oracledb.getConnection( dbConfig );
    const sql = `select * from members where id='${body}'`;
    let result;
    try {
        result = await con.execute(sql)
    } catch (err) {
        console.log(err)
    }
    console.log("dao result : " , result.rows[0])
    return result.rows[0];
}

const memberInfo = async ( req ) => {
    let con = await oracledb.getConnection ( dbConfig );
    const sql = `select * from members`;
    let result;
    try {
        result = await con.execute(sql)
    } catch (err) {
        console.log(err)
    }
    console.log("dao result : ", result.rows)
    return result.rows;
}

const register = async (req) => {
    let con = await oracledb.getConnection (dbConfig);
    console.log("req id : ", req.id)
    const sql = `insert into members values (:id,:pwd,:name,:addr)`
    let result;
    try {
        result = await con.execute(sql, {
            id : req.id, 
            pwd : req.pwd, 
            name : req.name,    
            addr : req.addr
        })
    } catch (err) {
        console.log(err)
    }
    return result.rowsAffected;
}

module.exports = {
    loginCheck,
    memberInfo,
    register,
}