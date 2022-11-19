const sendmail = async (Email) => {
    require('dotenv/config')
    console.log("hello")
    const userkanaam = process.env.userkanaam
    const sabkapass = process.env.PASSWORD
    const nodemailer = require("nodemailer");
    return new Promise(function (resolve, reject) {
        let transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "shaguntyagi74@outlook.com",
                pass: "shaguntyagi@2003"
            },
        });

        const option = {
            from: userkanaam,
            to: Email,
            subject: "Hello ✔",
            text: "hello"
        }
        transporter.sendMail(option, async (error, info) => {
            if (info) {
            }
            else {
                reject(error)
            }
        })
                resolve("success")
    })
}
module.exports = sendmail