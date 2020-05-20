// 生成6位随机数
function generate6Number () {
    return ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
}

module.exports = generate6Number