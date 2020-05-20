const path = require('path')
module.exports = {
    MONGODB_URL: 'mongodb://localhost:27017/helpcenter',
    SUCCESS: 1000,
    FAIL: 9999,
    PORT: 3001,
    /*  邮件服务器配置 start */
    MAIL_HOST: '',
    MAIL_PORT: 25,
    MAIL_ACCOUNT: '',
    MAIL_PASS: '',
    /*  邮件服务器配置 start */
    /*  上传路径 start */
    ICON_UPLOAD_PATH: `${path.join(__dirname, '../', '/static/upload/icon/')}`,
    ICON_URL_OUPUT: `http://localhost:3001/upload/icon/`,
    EDITOR_UPLOAD_PATH: `${path.join(__dirname, '../', '/static/upload/editor/')}`,
    EDITOR_URL_OUTPUT: `http://localhost:3001/upload/editor/`
    /*  上传路径 end */
}