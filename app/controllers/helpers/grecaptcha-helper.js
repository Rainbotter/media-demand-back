"use strict";

const request = require('request');
const recaptchaSecret = require('../../config/recaptachaSecret.js');

const grecapatchaUrl = 'https://www.google.com/recaptcha/api/siteverify';

class grecaptchaHelper {

    static getGrecapatchaScore(token) {

        const data = {
            secret: recaptchaSecret.secret,
            response: token
        };

        let clientServerOptions = {
            uri: grecapatchaUrl + '?secret=' + data.secret + '&response=' + data.response,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        };

        return new Promise((resolve, reject) => {
            request(clientServerOptions, function (error, response, body) {
                if (error) {
                    return reject(new Error(error));
                } else if (response) {
                    let result = JSON.parse(body);
                    if (!result.success || result.score < 0.5) {
                        return reject(new Error('Too low score'));
                    } else {
                        return resolve(result.score);
                    }
                }
            });
        });
    }

}

module.exports = grecaptchaHelper;