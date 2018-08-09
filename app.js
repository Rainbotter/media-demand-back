const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./app/config/logger');
const database = require('./app/config/mongoConnector.js');
const controllers = require('./app/controllers/');

const port = 8081;
const baseUrl = "/api";


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(baseUrl,controllers);

process.on('beforeExit', (code) => {
    close_application(code);
});

process.on('SIGINT', function() {
    close_application(0);
});

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

function exit(exit_code){
    if (exit_code === 0) {
        logger.info("The application will gracefully exit (code " + exit_code + ").");
    } else {
        logger.error("An error has been raised. The application will now exit (code " + exit_code + ").");
    }

    process.exit(exit_code);
}