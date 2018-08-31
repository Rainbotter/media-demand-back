const mongoose = require('mongoose');
const logger = require('winston');
const fs = require('fs');

    const mongoDB = '/media_demands';
const mongoProtocol = 'mongodb://';
const mongoURL = '127.0.0.1:27017';
const mangooseOptions = {};


const mongoUserFilePath = './mongo_user.txt';
const mongoPasswordFilePath = './mongo_secret.txt';
const encoding = 'utf8';

function connect() {

    let mongoUserFilePromise = new Promise(function (resolve, reject) {
        fs.readFile(mongoUserFilePath, encoding, function (err, data) {
            if (err) {
                reject();
            }

            resolve(data);
        })
    });

    let mongoPasswordFilePromise = new Promise(function (resolve, reject) {
        fs.readFile(mongoPasswordFilePath, encoding, function (err, data) {
            if (err) {
                reject();
            }

            resolve(data);
        })
    });

    return new Promise(function (resolve, reject) {
        Promise.all([mongoUserFilePromise, mongoPasswordFilePromise]).then(result => {
            mongoose.connect(mongoProtocol + result[0] + ':' + result[1] + '@' + mongoURL + mongoDB, mangooseOptions).then(
                () => {
                    logger.info("Database connected successfuly to " + mongoDB);
                    resolve();
                },
                err => {
                    logger.error(err);
                    reject(1);
                });
        });
    });
}

function close() {
    if (mongoose.connection.readyState) {
        return new Promise(function (resolve, reject) {
            mongoose.connection.close().then(
                () => {
                    logger.info("Database connection closed successfully");
                    resolve();
                },
                err => {
                    logger.error(err);
                    reject(2);
                });
        });
    }
}

module.exports.connect = connect;
module.exports.close = close;