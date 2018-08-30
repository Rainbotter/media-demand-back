const mailConfig = require('../../config/mailConfig');
const logger = require('winston');

class mailHelper {

    static sendNewMusicDemandCreatedMail(demand) {

        const message = {
            from: 'demands@bober.ovh',
            to: 'antoine.robert@bober.ovh',
            subject: 'Nouvelle demande de musique : ' + demand.artiste,
            text: 'Une nouvelle demande viens d\'arriver !\n\n' +
                'Artiste : ' + demand.artiste + '\n' +
                'Discographie complète : ' + demand.fullDiscography + '\n' +
                'Album : ' + demand.album + '\n' +
                'Année : ' + demand.year + '\n' +
                'Genre : ' + demand.genre + '\n'
        };

        mailConfig.transporter.sendMail(message, (error, info) => {
            if (error) {
                logger.error(error);
            }
            logger.info('Message sent: %s', info.messageId);
        });

    }

}

module.exports = mailHelper;