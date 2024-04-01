const member = require("../db/memberDAO");
const index = () => {
    return member;
}
const getMember = ( id ) => {
    const mem = member.filter((d) => d.id === id);
    console.log("service member")
    console.log(mem)
    return mem;
}


module.exports = {
    index : index,
    getMember : getMember,
};