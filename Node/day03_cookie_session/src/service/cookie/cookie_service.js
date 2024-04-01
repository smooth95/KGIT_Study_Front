const db = require("../../db/user_cart");
const cart = () => {
    return db;
}

const save = (cart_list, id) => {
    let bool = true;

    for (let i = 0; i < cart_list.length; i++) {
        if (cart_list[i].goods_id == id) {
            cart_list[i].number++;
            cart_list[i].total += cart_list[i].price;
            bool = false;
            break;
        }
    }
    if (bool ) {
        for (let i = 0; i < db.length; i++) {
            if (db[i].goods_id == id) {
                //cart_list = db[i];
                cart_list.push( db[i]);
                var endLength = cart_list.length - 1;
                cart_list[endLength].number = 1;
                cart_list[endLength].total = cart_list[endLength].price;
                break;
            }
        }
    }
    console.log("cart list : ", cart_list)
    return cart_list;
}


module.exports = { cart, save, };