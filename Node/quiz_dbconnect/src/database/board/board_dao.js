const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;



const getList = async () => {
    let con = await oracledb.getConnection( dbConfig );
    const sql = `select * from board`;
    let result;
    try {
        result = await con.execute(sql)
    } catch (err) {
        console.log(err);
    }
    return result

}


module.exports = {
    getList,
}