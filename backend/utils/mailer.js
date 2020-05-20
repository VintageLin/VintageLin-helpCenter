const nodemailer = require('nodemailer')
const CONSTANT = require('../config/constant')

async function main({
    host = CONSTANT.MAIL_HOST,
    port = CONSTANT.MAIL_PORT,
    account = CONSTANT.MAIL_ACCOUNT,
    password = CONSTANT.MAIL_PASS,
    sendTo,
    subject,
    content
}) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account, // generated ethereal user
            pass: password // generated ethereal password
        }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: account, // sender address
        to: sendTo, // list of receivers
        subject: subject, // Subject line
        //   text: "Hello world?", // plain text body
        html: content // html body
    });
  
    console.log("Email sent: %s", info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    return info
}
  
//   main().catch(console.error);

module.exports = main
