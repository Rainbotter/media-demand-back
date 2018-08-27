const logger = require('winston');
const fs = require('fs');

const filePath = './secret.txt';
const encoding = 'utf8';

let secret = '';

function prepareSecret() {
    return new Promise(function (resolve, reject) {
        logger.info('Recaptcha: trying to get secret key from file ' + filePath);
        fs.readFile(filePath, encoding, function (err, data) {
            if (err) {
                logger.error('Couldn\'t read file', err);
                return reject(3);
            }

            logger.info('File found. Secret will be read.');
            exports.secret = data;
            return resolve(data);
        });
    });
}

module.exports.prepareSecret = prepareSecret;
module.exports.secret = secret;