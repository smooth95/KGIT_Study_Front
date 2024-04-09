const user = [
    {id : "aaa", pwd : "aaa"},
    {id : "bbb", pwd : "bbb"},
    {id : "ccc", pwd : "ccc"},
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

module.exports = {
    process,
    getMessage,
}