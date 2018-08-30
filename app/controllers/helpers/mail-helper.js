const nodemailer = require('nodemailer');

class mailHelper {

    static sendNewMusicDemandCreatedMail() {

        const message = {
            from: 'demands@bober.ovh',
            to: 'antoine.robert03@gmail.com',
            subject: 'Nouvelle demande de musique',
            text: 'Plaintext version of the message',
            html: '<p>HTML version of the message</p>'
        };

    }

}

module.exports.mailHelper = mailHelper;