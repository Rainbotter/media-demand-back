const express = require('express');
const logger = require('winston');
const router = express.Router();
const musicDemandHelper = require('../models/music-demand');

router.get('/', function (req, res) {
    musicDemandHelper.getAllMusicDemands()
        .then(value => res.json({musicDemands: value}));

});

router.get('/:id', function (req, res) {
    musicDemandHelper.getMusicDemandById(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404);
                res.json({
                    message: "Could not find element",
                    element: req.params.id
                })
            } else {
                res.status(200);
                res.json(result)
            }
        })
        .catch(err => {
            logger.error(err);
        });
});

router.put('/:id/resolve', function (req, res) {
    if (req.params.id) {
        musicDemandHelper.resolveMusicDemand(req.params.id)
            .then(result => {
                if (!result) {
                    res.status(404);
                    res.json({
                        message: "Could not find unresolved element",
                        element: req.params.id
                    })
                } else {
                    res.status(200);
                    res.json({resolveDate: result.resolveDate})
                }
            })
            .catch(err => {

            });
    }
    else {
        res.status(400);
        res.send();
    }
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