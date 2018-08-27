const mongoose = require('mongoose');
const logger = require('winston');

const mongoDB = 'mongodb://127.0.0.1:27017/media_demands';
const mangooseOptions = {};

function connect() {
    return new Promise(function (resolve, reject) {
        mongoose.connect(mongoDB, mangooseOptions).then(
            () => {
                logger.info("Database connected successfuly to " + mongoDB);
                resolve();
            },
            err => {
                logger.error(err);
                reject(1);
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