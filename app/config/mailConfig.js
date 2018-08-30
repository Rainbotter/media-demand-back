const nodemailer = require('nodemailer');
const logger = require('winston');
const fs = require('fs');

const passwordFile = './mail_secret.txt';
const encoding = 'utf8';

let transporter;

function verifyConnection() {
    return new Promise(function (resolve, reject) {

        fs.readFile(passwordFile, encoding, function (err, data) {
            if (err) {
                logger.error('Couldn\'t read file', err);
                return reject(4);
            }

            logger.info('File ' + passwordFile + ' found. Mail password will be read.');


            const smtpConfig = {
                host: 'smtp.bober.ovh',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'demands@bober.ovh',
                    pass: data
                }
            };

            transporter = nodemailer.createTransport(smtpConfig);
            transporter.verify(function (error, success) {
                if (error) {
                    logger.error(error);
                    reject(5);
                } else {
                    logger.info('Connection to smtp server succeed');
                    resolve();
                }
            });

            module.exports.transporter = transporter;
        });
    });
}

module.exports.verifyConnection = verifyConnection;