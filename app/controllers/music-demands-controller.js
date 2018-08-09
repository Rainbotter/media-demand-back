const express = require('express');
const logger = require('winston');
const router = express.Router();
const musicDemandHelper = require('../models/music-demand');

router.get('/', function (req, res) {
    musicDemandHelper.getAllMusicDemands()
        .then(value => res.json({musicDemands: value}));

});

router.get('/:id', function (req, res) {
    musicDemandHelper.getMusicDemandById()
        .then(value => {
            res.status(200);
            res.json({musicDemands: value})
        })
        .catch(err => {

        });
});

router.post('/', function (req, res) {
    if (req.body) {
        musicDemandHelper.createNewMusicDemand(req.body)
            .then(id => {
                res.json({id: id});
                res.status(201);
            })
            .catch(err => {
                logger.error(err);
                res.status(400);
                res.send();
            });
    } else {
        res.status(400);
        res.send();
    }

});

module.exports = router;