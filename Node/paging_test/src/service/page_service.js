const dao = require("../database/pageDAO")

const pageRead = {
    list : async (start, totalC) => {
        start = ( start && start > 1 )? Number( start ) : 1;

        const page = pageOperation(start, totalC)
        // if (start == undefined ) {
        //     start = 1;
        // } else {
        //     start = Number(start);
        // }
        const list = await dao.daoRead.list(page.startNum, page.endNum);
        console.log("service : ", list);

        data = {};
        data.page = page;
        data.start = start;
        data.list = list.rows;

        return data;
    },
    content : async (num) => {
        await pageUpdata.upHit( num );
        const data = await dao.daoRead.content(num);
        return data.rows[0];
    },
    totalContent : async () => {
        const totalContent = await dao.daoRead.totalContent();
        console.log(totalContent);
        return totalContent.rows[0]["COUNT(*)"]
    }
}

const pageOperation = ( start, totalContent) => {
    let page = {};
    const pageNum = 3;
    const num = (totalContent % pageNum == 0)?0:1;
    page.totPage = parseInt( totalContent / pageNum) + num;
    page.startNum = (start-1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}

const pageUpdata = {
    upHit : async (num) => {
        await dao.daoUpdate.upHit( num );
    }
}

const pageInsert = {
    write : async (body) => {
        const reulst = await dao.daoInsert.write(body);
    }
}
module.exports = {
    pageRead,
    pageInsert
}