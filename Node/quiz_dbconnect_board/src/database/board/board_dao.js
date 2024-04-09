const con = require("../common_dao")
const boardRead = {
    list : async (start, end) => {
        // const sql = "select * from board";
        const sql = `select * from (select rownum rn, A.* from 
            (select * from board order by write_no desc)A)
            where rn between ${start} and ${end}`;
        const list = (await con).execute(sql)
        return list;
    },
    data : async (num) => {
        const sql = `select * from board where write_no='${num}'`
        const data = (await con).execute(sql);
        return data;
    },    
    totalContent : async () => {
        const sql = "select count(*) from board";
        const totalContent = await (await con).execute( sql );
        return  totalContent.rows[0]['COUNT(*)'];
    }
}

const boardInsert = {
    write : async (body) => {
        const sql = `
        insert into board(write_no, id, title, content, origin_file_name, 
            change_file_name) values( board_seq.nextval, :id, :title, :content, 
            :origin_file_name, :change_file_name)
        `;
        const result = (await con).execute(sql, body);
        return result;
    }
}

const boardUpdate = {
    upHit : async (num) => {
        const sql = `update board set hit = hit + 1 where write_no='${num}'`;
        (await con).execute(sql);
    },
    delete : async (writeNo) => {
        const sql = `delete from board where write_no=${writeNo}`;
        (await con).execute(sql);
    },
    modify : async ( body )=>{
        const sql = `update board set title=:title, content=:content, 
            origin_file_name=:origin_file_name, 
            change_file_name=:change_file_name where write_no=:write_no`;
        let result = 0;
        try {
            result = (await con).execute( sql, body );
        } catch (err) {
            console.log(err)
        }
        return result;
    }
}


module.exports = {
    boardRead, 
    boardInsert, 
    boardUpdate
}