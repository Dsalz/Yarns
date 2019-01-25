const dotenv = require('dotenv');
dotenv.config();
const mailjet = require('node-mailjet').connect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_SECRET_KEY);

module.exports = (emailInfo) => {
    const {
        subject,
        data,
    } = emailInfo
    const mailConfig = JSON.stringify({
    Messages: [
        {
        From: {
            Email: process.env.MAILJET_EMAIL_SENDER,
            Name: 'DamDam'
        },
        To: [
            {
            Email: 'salisu.damola@yahoo.com',
            }
        ],
        Subject: subject,
        HTMLPart: `<p>${data}</p>`
        }
    ]
    });
    return mailjet.post('send', { version: process.env.MAILJET_VERSION })
        .request(mailConfig)
        .then(result => Promise.resolve(result.body))
        .catch((err) => {
            const emailError = new Error()
            emailError.message = err.ErrorMessage
            emailError.statusCode = err.statusCode
            return Promise.reject(emailError)
        })
}