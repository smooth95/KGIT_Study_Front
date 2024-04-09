const dao = require("../../database/board/board_dao");
const common = require("../ser_common");

const boardUpdate = {
    upHit : (num) => {
        dao.boardUpdate.upHit(num);
    },
    delete : (writeNo) => {
        dao.boardUpdate.delete(writeNo);
    },
    modify : async (body, file) => {
        if (file !== undefined ) {
            body.origin_file_name = file.originalname;
            body.change_file_name = file.filename;
        }
        console.log("body : ", body)
        let result = 0;
        try {
            result = await dao.boardUpdate.modify(body)
        } catch (err) {
                console.log(err)
            }
        // let result = await dao.boardUpdate.modify(body)
        // 위의 try catch를 사용하지 않고 바로 위의 코드만 사용하면 에러 발생하는데
        // 웹페이지에서 표시가 되기때문에 try catch로 묶어서 예외처리한다.
        console.log("serviceresult : ", result)
        let msg, url;
        let message = {}
            message.result = result.rowsAffected;
        if (result === 1) {
            msg = "수정 되었습니다.";
            url = `/board/data/${body.write_no}`;
        } else {
            msg = "문제 발생.";
            url = `/board/modify_form/${body.write_no}`;
        }
        message.msg = common.getMessage(msg, url);
        console.log(message.msg)
        return message;
    }
}

const boardRead = {
    list : async ( start ) => {
        const totalCounter = await dao.boardRead.totalContent();
        start = ( start && start > 1)?Number(start) : 1;
        const page = pageOperation(start, totalCounter);

        // let list = await dao.boardRead.list();
        let list = await dao.boardRead.list(page.startNum, page.endNum);

        list = common.timeModify(list.rows)

        data ={};
        data.totalPage = page.totPage;
        data.start = start;
        data.list = list;

        // return list;
        return data;
    },
    data : async (num) => {
        boardUpdate.upHit(num);
        let data = await dao.boardRead.data(num);
        data = common.timeModify(data.rows);
        return data[0];
    }
}

const boardInsert = {
    write : async (body, file, fileValidation) => {
        let msg, url;
        if (fileValidation) {
            msg = fileValidation;
            url = "/board/write_form";
            return common.getMessage(msg, url);
        }
        console.log("file:",file)
        if (file !== undefined) {
            body.origin_file_name = file.originalname;
            body.change_file_name = file.filename;
        } else {
            body.origin_file_name = "nan";
            body.change_file_name = "nan";
        }
        console.log("body:",body)
        const result = await dao.boardInsert.write( body );
        if (result.rowsAffected === 1) {
            msg = "등록되었습니다.!!!"
            url = "/board/list";
        } else {
            msg = "문제 발생.!!!"
            url = "/board/write_form";
        }
        return common.getMessage(msg, url);
    }
}

const pageOperation = (start, totalCounter)=>{
    let page = {};
    const pageNum = 3; //페이지당 보여줄 개수
    const num = (totalCounter % pageNum === 0)?0:1;

    page.totPage = parseInt( totalCounter / pageNum ) + num;
    
    page.startNum = (start-1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}




module.exports = {
    boardRead,
    boardInsert,
    boardUpdate,

}