const config = require("../../../config/cookie_session/config")
const cookieConfig = config.cookieConfig;

const index = (req, res) => {
    const userCookie = req.cookies.myCookie;
    // const userCookie = req.signedCookies.myCookie;
    // 암호화 된 cookie를 불러오기 위해서는 signed를 사용해야한다.
    res.cookie("myCookie", "valueCookie", cookieConfig);
    res.render("cookie/cookie01", { userCookie } );
}

const popup = (req, res) => {
    res.render("cookie/popup")
}

const popup02 = (req, res) => {
    res.render("cookie/popup02")
}

const cookie02 = (req, res) => {
    const userCookie = req.cookies.myCookie;
    res.render("cookie/cookie02", { userCookie });
}

const makeCookie = (req, res) => {
    res.cookie("myCookie", "value", cookieConfig);
    res.send("<script> window.close() </script>")
}

const ser = require("../../service/cookie/cookie_service")

const cart = (req, res) => {
    res.render("cookie/cart", {list : ser.cart()})
}

const save = (req, res) => {
    const goods_id = req.params.goods;
    // ?로 넘어올때는 query로, /경로로 넘어오는것은 params로 전달받을 수 있다.
    // goods는 라우터에서 변수명으로 지정한 이름을 사용한다.

    let cart_list = req.cookies.cart_list;
    if (cart_list == undefined) {
        cart_list = []
    }
    cart_list = ser.save( cart_list, goods_id );
    res.cookie("cart_list", cart_list, cookieConfig)


    const msg = `<script>
        alert("${goods_id} 상품이 장바구니에 등록 되었음~!!");
        location.href="/cookie/cart";
    </script>`
    res.send(msg);
}

const viewList = (req, res) => {
    let cart_list = req.cookies.cart_list;
    if (!cart_list) { // cart_list === undefined
        const msg = `<script>
            alert("저장된 목록이 없습니다.");
            location.href = "/cookie/cart";
        </script>`
        res.send( msg );
    } 
    res.render("cookie/view_list", {list : cart_list})
}
module.exports = { 
    index, 
    popup, 
    popup02, 
    cookie02, 
    makeCookie,
    cart,
    save,
    viewList
};