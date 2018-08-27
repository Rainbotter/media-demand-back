const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./app/config/logger');
const database = require('./app/config/mongoConnector.js');
const recaptchaSecret = require('./app/config/recaptachaSecret.js');
const controllers = require('./app/controllers/');

const port = 8081;
const baseUrl = "/api";


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(baseUrl, controllers);

process.on('beforeExit', (code) => {
    close_application(code);
});

process.on('SIGINT', function () {
    close_application(0);
});

recaptchaSecret.prepareSecret()
    .then(data => {
    })
    .catch(errorCode => close_application(errorCode));

database.connect()
    .then(() => expose_application())
    .catch(errorCode => close_application(errorCode));

function expose_application() {
    app.listen(8081, function () {
        logger.info("Application started successfully. Now listening on port " + port);
    });
}

function close_application(exit_code) {
    database.close()
        .then(() => exit(exit_code))
        .catch(errCode => errCode);
}

function exit(exit_code) {
    if (exit_code === 0) {
        logger.info("The application will gracefully exit (code " + exit_code + ").");
    } else {
        logger.error("An error has been raised. The application will now exit (code " + exit_code + ").");
    }

    process.exit(exit_code);
}