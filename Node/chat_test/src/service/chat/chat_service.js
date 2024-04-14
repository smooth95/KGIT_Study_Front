const user = [
    {id : "aaa", pwd : "aaa", num : 101},
    {id : "bbb", pwd : "bbb", num : 102},
    {id : "ccc", pwd : "ccc", num : 103},
]
const process = {
    loginChk : (body) => {
        const result = user.filter(id => id.id === body.id)
        console.log("process result : ", result)
        return result;
    }
}

const getMessage = (msg, url) => {
    return `
    <script>
        alert('${msg}');
        location.href="${url}";
    </script>
    `
}

const getUser = () => {
    return user;
}

module.exports = {
    process,
    getMessage,
    getUser,
}