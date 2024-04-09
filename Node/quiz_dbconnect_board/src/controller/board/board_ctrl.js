const service = require("../../service/board/board_service")
const common = require("../../service/ser_common")


const board_view = {
    list : async (req, res) => {
        // const list = await service.boardRead.list();
        const data = await service.boardRead.list(req.query.start);
        res.render("board/list", {
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
        });
    },
    writeForm : async (req, res) => {
        const session = req.session;
        const msg = common.sessionCheck( session );
        if (msg !== 0) {
            return res.send(msg);
        }
        res.render("board/write_form", {username : session.username});
    },
    data : async (req, res) => {
        const data = await service.boardRead.data(req.params.num);
        const username = req.session.username;
        res.render("board/data", { data, username });
    },
    modifyForm : async (req, res) => {
        const data = await service.boardRead.data(req.params.writeNo);
        res.render("board/modify_form", {data})
    }
   
}
const board_process = {
    write : async (req, res) => {
        const msg = await service.boardInsert.write(
            req.body, req.file, req.fileValidation
        )
        res.send(msg);
    },
    delete : async (req, res) => {
        //데이터베이스 삭제 성공시 file삭제
        file_process.delete( req.params.imgName );
        await service.boardUpdate.delete(req.params.writeNo);
        res.redirect("/board/list");
    },
    modify : async (req, res) => {
        const deleteFile = req.body.change_file_name;
        const message = await service.boardUpdate.modify(req.body, req.file);
        if (req.file !== undefined && message.result === 1) {
            file_process.delete(deleteFile);
        }
        res.send( message.msg );
    }
}
const fs = require("fs");
const file_process = {
    download : (req, res) => {
        const filePath = `./upload_file/${req.params.imgName}`
        res.download(filePath);
    },
    delete : (imgName) => {
        if(imgName !== 'nan' ) {
            fs.unlinkSync(`./upload_file/${imgName}`);
            //nan이 아니라면 파일을 삭제한다. (삭제하는 기능)
        }
    }
}


module.exports = {
    board_view,
    board_process,
    file_process,
}